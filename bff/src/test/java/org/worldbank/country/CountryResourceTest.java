package org.worldbank.country;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;

@QuarkusTest
public class CountryResourceTest {

    @Test
    public void tasks() throws InterruptedException {
        given()
                .when().get("/countries")
                .then()
                .statusCode(200)
                .body("size()", is(greaterThanOrEqualTo(1)));
    }

}
