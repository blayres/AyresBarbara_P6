function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
      const article = document.createElement( 'article' );
      const img = document.createElement( 'img' );
      img.setAttribute("src", picture)
      const h2 = document.createElement( 'h2' );
      h2.textContent = name;
      const cityEl = document.createElement('h3')
      const taglineEl = document.createElement('h4')
      const priceEl = document.createElement("h5");
      cityEl.textContent = `${city + ", " + country}`;
      taglineEl.textContent = `${tagline}`;
      priceEl.textContent = `${price} €`;
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(cityEl);
      article.appendChild(taglineEl);
      article.appendChild(priceEl);
      return (article);
  }
  return { name, picture, getUserCardDOM }
}