# Octovolt Website

This is the Octovolt website hosted at [https://octovolt.xyz](https://octovolt.xyz), which is based on Next.js and utilizes TypeScript, React and Node.js. The site is primarily an e-commerce site, but it also has pages for a blog. In the future, I hope to add JavaScript experiments; CSS, JS, and WebGL artwork; web based utilities for making music or working with my products; and maybe some other dark corners.  

It was originally a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), but I have modified it a bit since that initial bootstrap.

I hope that by publishing this code on GitHub it might (eventually) serve as an example of how to build an e-cammerce site from scratch without needing to pay a third party a bunch of money for hosting and/or the management of transactions. Ideally, this would free people to create more microbusinesses and hobby businesses that are more readily profitable, rather than speding all of their very small revenue on the mechanics of e-commerce.

## Getting Started

First, run the development server:

```bash
npm run dev
```

The site will now be viewable at [http://localhost:3000](http://localhost:3000). 

Then, run the proxy for HTTPS:

```bash
npx local-ssl-proxy --config local-ssl-proxy-config.json
```

Open [https://localhost:3001](https://localhost:3001) with your browser to see the result.

## Custom Markdown Parsing with Remark

There is some custom Markdown parsing encapsulated as a Remark plugin in the src/lib/remarkUtils.ts file. The purpose of this custom parsing is to allow me to write external links that open in a new tab, and to include an associated "external link" icon with those links.

## Product Catalog and Blog

A new product gets added to the catalog by adding a Markdown file to src/markdown/products. Similarly, a new blog post gets added by adding a new Markdown file within src/markdown/posts. See src/lib/products.ts and src/lib/posts.ts to understand how these Markdown files are parsed and presented in the UI, in addition to the src/app/products and src/app/news directories.

## Local Storage Shopping Cart and State Management

The shopping cart is implemented with local storage. I did consider using cookies and a server side data store, but this would have been even more complicated, would have required a privacy disclaimer, etc. And it's not clear to me that this would be superior in any way.

The cart utilizes the [Flux](https://legacy.reactjs.org/blog/2014/05/06/flux.html) state management pattern of declarative actions, a reactive store and a reactive UI, but implements it with useReducer and useContext, similar to the [React documentation examples](https://react.dev/learn/scaling-up-with-reducer-and-context). Since the amount of state is small, this works pretty well. If this become more complex I will need to reach for something like Redux or perhaps roll my own event-driven solution.

See src/lib/cartReducer.ts for most of the code related to state management. This is added to the client code in src/app/components/body.tsx.

---------

## TODOs

### Contact Form

I was not able to get the contact form to work locally. I'm hopeful that I'll have better luck once it's deployed to a real server.

### E-commerce

I hope to calculate shipping on the fly with an API call to FedEx.

I am going to include both PayPal and Credit Card options. I hope to power the Credit Card payment with Stripe, but I would use whatever service is cheapest and yet works with international payments. If you have a better suggestion, please let me know. 

Again, I think all of this will be easier to develop on a live server rather than locally.


### Super Secret Stuff

Obviously, I can't share a bunch of my own sensitive info in this repo. So all of that will need to be in a file or two outside of the repo and referred to with environment variables or something. This is not yet set up. 
