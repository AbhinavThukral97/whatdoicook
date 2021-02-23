import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Input from "../components/input"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section>
      <div className={`content`}>
        <h1 className={`center`}>What's in your fridge?</h1>
      </div>
      <div className={`content--md`}>
        <Input resultsCallback={
          () => {
            document.getElementById('results').style.display = 'block';
            window.scrollTo(0,document.body.scrollHeight);
          }
        } />
      </div>
    </section>
    <section id="results">
      <div className={`content--md`}>
        <h6 className={`center`}>Suggestions</h6>
        <div className={`show`}>
          <h2 className={`center margins--lg`}>🍕 Ah, too much effort, just order a takeaway?</h2>
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage
