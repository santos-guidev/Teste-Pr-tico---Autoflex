package com.autoflex.resource;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class ProductResourceTest {

    @Test
    public void testListAllProducts() {
        given()
          .when().get("/products")
          .then()
             .statusCode(200);
    }

    @Test
    public void testGetNonExistentProduct() {
        given()
          .when().get("/products/999")
          .then()
             .statusCode(204); // Panache findById returns null -> 204 No Content
    }
}
