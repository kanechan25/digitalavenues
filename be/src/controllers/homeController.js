let getHomePage = async (req, res) => {
  try {
    return res.render("homepage.ejs", {});
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getHomePage,
};
