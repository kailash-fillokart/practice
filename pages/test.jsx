import React from "react";

const test = () => {
  return (
    <div class="test-wrapper">
      <div class="test-card">
        <div class="test-image">
          <img src="https://i.imgur.com/Jk44eEl.png" width="300" />
        </div>

        <div class="test-about-product text-center">
          <h3>COX Headphone</h3>

          <h4>
            $99.<small>99</small>
          </h4>

          <button class="btn btn-success test-buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default test;
