import app from "./app.js";

app.listen(process.env.PORT || 3000, () => {
    console.log("Backend is running on port", process.env.PORT || 3000);
});

