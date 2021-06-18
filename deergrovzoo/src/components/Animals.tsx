import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";

export const Animals = () => {
  let defaultValue: Animal[] = [];
  const [animals, setAnimals] = useState(defaultValue);

  useEffect(() => {
    if (localStorage.getItem("storedAnimals") === null) {
      axios
        .get<Animal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
          setAnimals(response.data);

          localStorage.setItem("storedAnimals", JSON.stringify(response.data));
        });
    } else {
      let animals = JSON.parse(localStorage.getItem("storedAnimals") || "[]");
      setAnimals(animals);
    }
  }, []);

  let liTags = animals.map((animal) => {
    return (
      <li className="animalItem" key={animal.id}>
        <img src={animal.imageUrl} alt="" />
        <h4>{animal.name}</h4>
        <p>{animal.shortDescription}</p>

        <Link to={"/animal/" + animal.id}>Läs mer</Link>
      </li>
    );
  });

  return <ul className="animalList">{liTags}</ul>;
};
