package org.worldbank.country;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.json.JSONArray;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;

@ApplicationScoped
public class CountryBean {

    public List<Country> list(){
        Client client = ClientBuilder.newClient();
        Response response = client.target("http://api.worldbank.org/v2/country?per_page=300")
                .request(MediaType.APPLICATION_XML_TYPE)
                .get();

        String result = response.readEntity(String.class);
        Countries countries = new Countries();
        try {
            XmlMapper mapper = new XmlMapper();
            countries = mapper.readValue(result, Countries.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return countries.getCountries();
    }

    public List<Indicator> indicadoresPorCodigoPais(String code){
        Client client = ClientBuilder.newClient();
        Response response = client.target("http://api.worldbank.org/v2/country/"+code+"/indicator/SI.POV.DDAY?format=json")
                .request(MediaType.APPLICATION_JSON)
                .get();

        String result = response.readEntity(String.class);
        JSONArray objects = new JSONArray(result);

        //@TODO o item 0 pussui o valores para paginacao
        String jsonArray = objects.getJSONArray(1).toString();
        List<Indicator> indicators = Collections.emptyList();

        try {
            ObjectMapper mapper = new ObjectMapper();
            indicators = mapper.readValue(jsonArray, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return indicators;
    }
}
