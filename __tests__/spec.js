
import app from "../src/main";
import * as supertest from "supertest";

import * as models from "../src/models";

// we don't test the models, we test the controllers/routes
jest.mock("../src/models");

describe("end to end tests", () => {

    describe("post codes", () => {

        describe("single post code", () => {

            test("success", async (done) => {

                const postcode = "SE166RZ";
                const dummyBody = {
                    postcode,
                    latitude: 777,
                    longitude: 666,
                };

                models.postcodesApi.getPostcode.mockResolvedValue(dummyBody);

                supertest(app)
                    .get(`/postcodes/${postcode}`)
                    .expect(200)
                    .end((err, res) => {

                        if (err)
                            throw err;

                        expect(res.body).toStrictEqual(dummyBody);

                        done();
                    });
            });

            test("not found case", async (done) => {

                models.postcodesApi.getPostcode.mockResolvedValue(undefined);

                supertest(app)
                    .get("/postcodes/????")
                    .expect(404, done);
            });
        });

        describe("multiple post code", () => {

            test("success", async (done) => {

                const body = [
                    {
                        postcode: "SE166RZ",
                        latitude: 777,
                        longitude: 666,
                    },
                    {
                        postcode: "TESTTEST",
                        latitude: 999,
                        longitude: 888,
                    },
                    {
                        postcode: "TESTTESTTEST",
                        latitude: 9999,
                        longitude: 8888,
                    }
                ];

                const postcodesAsString = body.map(item => item.postcode).join(",");

                models.postcodesApi.getBatchPostcodes.mockResolvedValue(body);

                supertest(app)
                    .get(`/postcodes/${postcodesAsString}`)
                    .expect(200)
                    .end((err, res) => {

                        if (err)
                            throw err;

                        expect(res.body).toStrictEqual(body);

                        done();
                    });
            });

            test("empty array", async (done) => {

                supertest(app)
                    .get("/postcodes/,,,,")
                    .expect(400, done);
            });
        });
    });

    describe("weather", () => {

        const latitude = 51.500521;
        const longitude = -0.044641;

        test("success", async (done) => {

            const dummyBody = { key : "value" };

            models.openweathermapApi.getWeatherForecast.mockResolvedValue(dummyBody);

            supertest(app)
                .get(`/weather?latitude=${latitude}&longitude=${longitude}`)
                .expect(200)
                .end((err, res) => {

                    if (err)
                        throw err;

                    expect(res.body).toStrictEqual(dummyBody);

                    done();
                });
        });

        test("missing latitude", async (done) => {

            supertest(app)
                .get("/weather")
                .expect(400, done);
        });

        test("missing longitude", async (done) => {

            supertest(app)
                .get(`/weather?latitude=${latitude}`)
                .expect(400, done);
        });

        test("invalid latitude", async (done) => {

            supertest(app)
                .get(`/weather?latitude=??????&longitude=${longitude}`)
                .expect(400, done);
        });

        test("invalid longitude", async (done) => {

            supertest(app)
                .get(`/weather?latitude${latitude}&longitude=??????`)
                .expect(400, done);
        });
    });

    describe("address", () => {

        const latitude = 51.500521;
        const longitude = -0.044641;

        test("success", async (done) => {

            const dummyBody = { key : "value" };

            models.nominatimApi.getAddress.mockResolvedValue(dummyBody);

            supertest(app)
                .get(`/address?latitude=${latitude}&longitude=${longitude}`)
                .expect(200)
                .end((err, res) => {

                    if (err)
                        throw err;

                    expect(res.body).toStrictEqual(dummyBody);

                    done();
                });
        });

        test("missing latitude", async (done) => {

            supertest(app)
                .get("/address")
                .expect(400, done);
        });

        test("missing longitude", async (done) => {

            supertest(app)
                .get(`/address?latitude=${latitude}`)
                .expect(400, done);
        });

        test("invalid latitude", async (done) => {

            supertest(app)
                .get(`/address?latitude=??????&longitude=${longitude}`)
                .expect(400, done);
        });

        test("invalid longitude", async (done) => {

            supertest(app)
                .get(`/address?latitude${latitude}&longitude=??????`)
                .expect(400, done);
        });
    });

});
