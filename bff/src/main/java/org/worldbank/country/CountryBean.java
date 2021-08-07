package org.worldbank.country;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
}
