import Image from "next/image";

export default function Home() {
  return (
    <div className="app">
      <h1>CRUD APP</h1>
      <div className="form">
        <label>Movie name</label>
        <input type="text" name="movieName" />
        <label>Review</label>
        <input type="text" name="review" />
        <button>Submit</button>
      </div>
    </div>
  );
}
