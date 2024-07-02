import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { searchCompanies } from "./api";
import { CompanySearch } from "./company";
import ListPortfolio from "./Components/Portfolio/ListPortfolio/ListPortfolio";
import { on } from "process";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";

function App() {
  const [search, setSearch] = useState<string>(""); // you can have ts either infer it(no generics) or use generics to set type checking
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]); // API call we made it so it returns either string array or a string
  const [serverError, setServerError] = useState<string | null>(null); // Remember the API call that errors returns a string

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // going into input and getting value
    console.log(e);
  };

  const onPortfolioCreate = (e: any) => {
    // "e: any" turns of type script or type checking portion
    e.preventDefault();
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if (exists) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio); // Reason for this, is cuz React doesn't like mutable arrays, wants a new array to re-render
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  };
  const onSearchSubmit = async (e: SyntheticEvent) => {
    // If you can't get event MouseEvent<HTMLButtonElement, MouseEvent> to work use "e: SyntheticEvent"
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
    console.log(searchResult);
  };

  return (
    <>
      <Navbar />
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
      {serverError && <h1>{serverError}</h1>}
    </>
  );
}

export default App;
