const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
      .then(() => {
        if (!res.headersSent) {
          res.status(200).json({ success: true });
        }
      })
      .catch((error) => {
        console.log("Error in Async Handler", error);
        res.status(500).json({ success: false, error });
      });
  };
};

export { asyncHandler };
