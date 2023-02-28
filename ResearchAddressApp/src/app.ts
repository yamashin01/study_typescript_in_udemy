import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.querySelector("#address") as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyBG8eITR71zdphoHMc56FncZwAyk0Q2sdU";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

// declare var google: any;

function searchAddressHandler(e: Event) {
  e.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("座標を取得できませんでした。");
      }
      console.log(res);
      const coordinates = res.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    })
    .catch((error) => {
      alert(error.message);
      console.log(error);
    });
}

form.addEventListener("submit", searchAddressHandler);
