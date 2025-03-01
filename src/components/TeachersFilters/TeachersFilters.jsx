const TeachersFilters = () => {
  return (
    <div>
      <label>
        Languages
        <select>
          <option value="all">All</option>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="german">German</option>
        </select>
      </label>

      <label>
        Level of knowledge
        <select>
          <option value="all">All</option>
          <option value="A1">A1 Beginner</option>
          <option value="A2">A2 Elementary</option>
          <option value="B1">B1 Intermediate</option>
        </select>
      </label>

      <label>
        Price
        <select>
          <option value="all">All</option>
          <option value="20">$20</option>
          <option value="30">$30</option>
          <option value="40">$40</option>
        </select>
      </label>
    </div>
  );
};

export default TeachersFilters;
