import { useEffect, useState } from "react";
import "./stateselector.css";

const StateSelector = () => {

    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const fetchCountryList = async () => {
        try{
            const response = await fetch("https://crio-location-selector.onrender.com/countries")
            const data = await response.json();
            setCountryList(data);
            console.log("countries",data);
        }catch(error){
            console.error("Error fetching countries:", error);
        }
    }

    const fetchStateList = async (selectedCountry) => {
        try{
            if(selectedCountry){
                const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
                const data = await response.json();
                setStateList(data);
                setSelectedState("");
                setCityList([]);
                setSelectedCity("");
                console.log("states",data);
            }
        }catch(error){
                console.error("Error fetching states:", error);
        }
    }

    const fetchCityList = async (selectedCountry, selectedState) => {
        try{
            if(selectedCountry && selectedState){
                const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
                const data = await response.json();
                setCityList(data);
                setSelectedCity("");
                console.log("cities",data);
            }
        }catch(error){
            console.error("Error fetching city:", error);
        }
    }

    useEffect(() => {
        fetchCountryList();
    },[])

    useEffect(() => {
        fetchStateList(selectedCountry);
    },[selectedCountry])

    useEffect(() => {
        fetchCityList(selectedCountry,selectedState);
    },[selectedCountry, selectedState])

    return (
        <>
        <h1> Select Location </h1>
        <select value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="drop-down" 
        >
            <option value=""> -- Select a country -- </option>
            {countryList.map((country) => (
                <option key={country} value={country}>{country}</option>
            ))}
        </select>
        <select value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled={!selectedCountry} 
        className="drop-down"
        >
            <option value=""> -- Select a State -- </option>
            {stateList.map((state) => (
                <option key={state} value={state}>{state}</option>
            ))}
        </select>
        <select value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled = {!(selectedCountry && selectedState) } 
            className="drop-down"
        >
            <option value=""> -- Select a City -- </option>
            {cityList.map((city) => (
                <option key={city} value={city}>{city}</option>
            ))}
        </select>
        
        {selectedCity &&
            <h2>You selected <span style={{fontSize:"30px"}}>{selectedCity}</span>, 
                <span style={{color:"gray"}}>{" "}{selectedState}, {selectedCountry}</span>
            </h2>
        }
    </>
    )
}

export default StateSelector;