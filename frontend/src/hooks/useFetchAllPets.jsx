import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://paw-some-nepal.vercel.app";

export default function useFetchAllPets() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/petFinder/get`)
      .then(function (response) {
        setPets(response.data.getallpets); //storing all the pets
        setFilteredPets(response.data.getallpets); // storing all the pets here for filtering
        console.log(response.data.getallpets);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = pets.filter((pet) => {
      return pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredPets(filtered);
  }, [searchQuery, pets]);

  const uniqueCategories = ["All", ...new Set(pets.map((pet) => pet.category))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredPets(pets);
    } else {
      const filtered = pets.filter((pet) => pet.category === category);
      setFilteredPets(filtered);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return {
    pets,
    filteredPets,
    selectedCategory,
    searchQuery,
    uniqueCategories,
    handleCategoryClick,
    handleSearchChange,
    loading,
  };
}
