function Publicaiton(title, author, pbuDate) {
  var publicAPI = {
    print() {
      console.log(`
			Title: ${title}
			By: ${author}
			${pubDate}
		`);
    },
  };
  return publicAPI;
}
