import fetchTimeout from "fetch-timeout";
import axios from "axios";

const iothub = "https://user-car-service.azurewebsites.net";
const USER_CAR_SERVICE_HOST = "https://user-car-service.azurewebsites.net/";
const CAR_NOTIFICATION_SERVICE = "https://car-notification.azurewebsites.net/getnotificationbyvin/";

const simulateTripUrl = iothub + "/senddata/trip";
const stopTripSimulationUrl = iothub + '/simulation/stop/'
const simulateDiagnisticUrl = iothub + "/senddata/vcondition";
const simulateEmissionUrl = iothub + "/senddata/econdition";
const tripDataURL = iothub + "viewtrip/1";

// user url
// user car url
axios.interceptors.request.use(
    (config) => {
        config.headers.authorization = `8d5355e4a23a8b0baea5b58f79ba3ce1bd285c5c62e8c39645bd4fce30a935a0`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export function getTrips() {
    console.log("getTrips Called...");
    return fetch("http://192.168.0.103:30000/connect/obddata");
}

export function simulateTrip(startPoint, endPoint) {
    console.log("simulateTrip Called...");
    const finalUrl = simulateTripUrl+'/OD02F7497/' + startPoint + '/' + endPoint;
    console.log('Simulate trip url - '+finalUrl)
    return axios.get(finalUrl);
}

export function stopTripSimulation(simulationId) {
    const stopFinalUrl = stopTripSimulationUrl + simulationId;
    console.log('Stoping the simulation with url - '+ stopFinalUrl);
    return axios.get(stopFinalUrl);
}

export function simulateDiagnistic() {
    console.log("simulateDiagnistic Called...");
    return fetchTimeout(simulateDiagnisticUrl, {}, 10000, "Timeout occured");
}

export function simulateEmission() {
    console.log("simulateEmission Called...");
    return fetchTimeout(simulateEmissionUrl, {}, 10000, "Timeout occured");
}

export function simulatetripData() {
    return fetchTimeout(tripDataURL, {}, 10000, "timeout occured");
}

// user car service

export function authenticateUser(userName, password) { }

export function getCarDetails(carId) {
    return axios.get(USER_CAR_SERVICE_HOST + "/viewcar/" + carId);        
}

export function getCarNotifications(vin) {
    return axios.get(CAR_NOTIFICATION_SERVICE + vin);        
}