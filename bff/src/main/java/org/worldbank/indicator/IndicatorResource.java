package org.worldbank.indicator;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/indicators")
@Produces(MediaType.APPLICATION_JSON)
public class IndicatorResource {

    @Inject
    IndicatorBean adapter;

    @GET
    @Path("{code}")
    public List<Indicator> listByCode(@PathParam("code") String code) {
        return adapter.list(code);
    }
}
