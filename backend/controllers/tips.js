const db = require("../config/db-config");

const getTips = (req, res) => {
  db.query("SELECT * FROM tips", (error, tipsResult) => {
    if (error) {
      console.log("Error fetching tips:", error);
      return res.status(500).send("Server Error!");
    }

    if (tipsResult.length === 0) {
      return res.status(404).send("Tip not found!");
    }

    const tipsIdList = tipsResult.map((tip) => tip.id);
    console.log("Fetched tips:", tipsResult);
    console.log("Tips ID list:", tipsIdList);

    db.query("SELECT * FROM contents WHERE tips_id IN (?)", [tipsIdList], (contentError, contentResult) => {
      if (contentError) {
        console.log("Error fetching contents:", contentError);
        return res.status(500).send("Server Error!");
      }

      console.log("Fetched contents:", contentResult);

      const tipsWithContent = tipsResult.map((tip) => {
        return {
          ...tip,
          content: contentResult.filter((content) => content.tips_id == tip.id),
        };
      });

      return res.status(200).json({
        status: "success",
        data: tipsWithContent,
      });
    });
  });
};

const getTipsById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM tips WHERE id = ?", [id], (error, tipsResult) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Server Error!");
    }

    if (tipsResult.length === 0) {
      return res.status(404).send("Tip not found!");
    }

    db.query("SELECT * FROM contents WHERE tips_id = ?", [id], (contentError, contentResult) => {
      if (contentError) {
        console.log(contentError);
        return res.status(500).send("Server Error!");
      }

      return res.status(200).json({
        status: "success",
        data: {
          ...tipsResult[0],
          content: contentResult,
        },
      });
    });
  });
};

module.exports = {
  getTips,
  getTipsById,
};
