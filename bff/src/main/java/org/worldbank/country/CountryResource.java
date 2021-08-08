package org.worldbank.country;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/countries")
@Produces(MediaType.APPLICATION_JSON)
public class CountryResource {

    @Inject
    CountryBean adapter;

    @GET
    public List<Country> listAll() {
        return adapter.list();
    }

    @GET
    @Path("{code}/indicators")
    public List<Indicator> listByCode(@PathParam("code") String code) {
        return adapter.indicadoresPorCodigoPais(code);
    }
}
