import axios from "axios";
import booksInfoPreparation from "../utils/utils.js";

const getBooks = async (req, res, next) => {
  const query = req.query.q;

  if (!query) {
    const error = new Error('Query parameter is required.');
    error.status = 400;
    return next(error);
  }

  try {
    const formattedQuery = query.trim().replace(/\s+/g, "+");
    const response = await axios.get(
      `${process.env.OPEN_LIBRARY_BASE_URL}?q=${formattedQuery}`
    );

    if (response.status !== 200) {
      const error = new Error("Failed to fetch data from Open Library.");
      error.status = 500;
      return next(error);
    }

    if (!response.data || !response.data.docs || response.data.docs.length === 0) {
      return res.status(404).json({ message: "No books found for the given query." });
    }

    const result = booksInfoPreparation(response.data);
    res.status(200).json(result);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status || 500)
        .json({ message: "Failed to fetch data from Open Library." });
    } else if (error.request) {
      return res
        .status(500)
        .json({ message: "No response from Open Library. Please try again later." });
    } else {
      return res
        .status(500)
        .json({ message: "An unexpected error occurred. Please try again later." });
    }
  }
};

export default getBooks;
