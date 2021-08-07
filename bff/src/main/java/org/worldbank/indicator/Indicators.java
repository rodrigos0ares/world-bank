package org.worldbank.indicator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Indicators {

    @JacksonXmlElementWrapper(useWrapping = false)
    @JsonProperty("country")
    private List<Indicator> countries;

    private Integer page;
    private Integer pages;
    private Integer total;

    public List<Indicator> getCountries() {
        return countries;
    }

    public void setCountries(List<Indicator> countries) {
        this.countries = countries;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }
}
