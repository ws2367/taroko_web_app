import React from 'react';
import QueueAnim from 'rc-queue-anim';
import DEMO from 'constants/demoData';

const products = DEMO.products;

class Products extends React.Component {
  render() {
    return (
      <article className="article">
        <h2 className="article-title">Products (List)</h2>
        <QueueAnim type="bottom" className="ui-animate">
          {
            products.map((product, i) => (
              <div key={i.toString()} className="mb-4">
                <div className="item-card card__horizontal mdc-elevation--z1">
                  <div className="card__image">
                    <a href={DEMO.link}>
                      <img alt="product" src={product.img} />
                    </a>
                  </div>
                  <div className="card__body card-white">
                    <div className="card__title">
                      <a href="{product.link}">{product.name}</a>
                      <span>Accessories</span>
                    </div>
                    <div className="card__price">
                      <span className="type--strikethrough">$699.99</span>
                      <span>$649.99</span>
                    </div>
                    <div className="divider divider-solid my-4" />
                    <p className="card__desc">From the way it works to the way it looks, Watch isn’t just something you wear. It’s an essential part of who you are.</p>
                  </div>
                </div>
              </div>
            ))
          }
        </QueueAnim>
      </article>
    );
  }
}

export default Products;
