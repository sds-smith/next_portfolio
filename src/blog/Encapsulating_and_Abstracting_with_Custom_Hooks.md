---
title: "Encapsulating and Abstracting with Custom React Hooks"
description: "The util functions of React"
date: "August 28, 2024"
---

# Encapsulating and Abstracting with Custom React Hooks  
# 
<p>I once worked on a project where another (more Senior) developer thought we should not introduce custom hooks because we had chosen to use utility functions for organizing our code. They were of the explicit opinion that util functions and custom hooks were an either/ or proposition.</p>  

<p>I have a tremendous respect for this person, and learned a lot from them, but on this particular point, I could not disagree more.</p>  

<p>In fact, I would assert that custom hooks and util functions complement one another and often are best when used in tandem. These two conventions may serve the same purpose(s) (encapsulation, abstraction, DRY...), but they satisfy completely different use cases. Where util functions are great for tucking away pure (vanilla) JavaScript logic for things like readability and reusability, custom hooks excel at doing the same where React-specific logic is involved.</p>  

<p>For example, let's consider the common practice of asyncronously fetching data from a backend or from an external service. In the case of the aforementioned project, we were building a React app hosted in a Sharepoint environment, and needed to interact with Lists and Libraries via the Sharepoint REST API. An obvious-enough solution would be to encapsulate all that code around the API call into its own util function (let's call it `getSharePointData()`). This in fact is exactly what we did, and `getSharePointData()` did a great job of mitigating otherwise duplicative code all over the codebase and it also did a nice job of cleaning up the code in the many places where it was used.</p>  

<p>However, `getSharePointData()` returned a Promise, which would eventually resolve (if successful) with the requested data. We were still forced to await or dot then the util function everywhere we called it, sometimes wrapping it in a `loading` state, sometimes not. That's still a good bit of duplicative code across all the Components that use our handy util function, and that's without considering all the catch blocks.</p>  

<p>This is a great use case for a custom hook to encapsulate all that logic around loading and error states and expose it for re-use.</p>  

<p>I first became aware of this pattern thanks to the `ApolloClient` library, which exports several hooks for querying GraphQL data. Front and center is `useQuery()`, which returns a `[ loading, error, data ]` tuple when invoked. My current project, another React application hosted in a Sharepoint environment, but one which I am creating from scratch and over which I have much more technical decision-making influence, seemed the perfect opportunity to develop something similar of my own. I've since become aware that this may be a fairly common pattern. Other libraries, like `react-query` or `tanstack-query` offer this functionality -- along with additional features like validation -- but it's easy enough to develop our own custom hook, and doing so may reduce our dependency overhead a bit.</p>  

<p>Let's look at some code:</p>  
<p></p>  

```
    //App.js
    import { useState, useEffect } from "react";
    import getSharePointData from "./utils/getSharePointData";

    export default function App() {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const url = 'some_url'

        useEffect(() => {
          if (!loading && !error && !data) {
            setLoading(true);
            getSharePointData(url)
              .then(setData)
              .catch(setError)
              .finally(() => setLoading(false));
          }
        }, [url]);

        return (
          <>
            {loading && <div>Loading</div>}
            {error && <div>Error</div>}
            {data && <div>{data.response}</div>}
          </>
        );
    }
```

<p></p>  

<p>Here we can see that our App Component is importing and using React's `useState` and `useEffect` hooks to manage the asyncronous data fetching, as well as loading state and error handling. We've tucked away all the data fetching logic in our `getSharePointData()` util function, so the Component looks fairly clean and readable. We see exactly _what_ our util function is doing (getting some data from SharePoint), but are not distracted by the _how_ (we can always click into that file if we want to examine that).</p>  

<p>Regarding `loading`, `error`, and `data`, only one will ever be truthy at any time, so we can conditionally render the appropriate information in the UI based on that. For an App and a Component this small and simple, this looks great. But what if we have a more complex Component? What if we have more that needs to be done with the data, or more complex error handling? What if we have several, or dozens or even hundreds of Components leveraging `getSharePointData()` against just as many Sharepoint Lists and Libraries? Moving our `useState` and `useEffect` calls into a custom hook can reduce a *lot* of sprawling code and help us to avoid repeating ourselves:</p>  

<p></p>  

```
    //useSharePoint.js
    import { useState, useEffect } from "react";
    import getSharePointData from "../utils/getSharePointData";

    export function useSharePoint(url) {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        useEffect(() => {
          if (!loading && !error && !data) {
            setLoading(true);
            getSharePointData(url)
              .then(setData)
              .catch(setError)
              .finally(() => setLoading(false));
          }
        }, [url]);

        return [ loading, error, data ];
    }
```

<p></p>  

<p>The first thing you may notice is that `useSharePointData` looks nearly identical to the original App Component. We've moved all of the State handling and the entire `useEffect` hook into our custom hook, and we're just returning the state values instead of JSX. This should dramatically simplify our App Component, but more than that, we will now only call `useState` and define this `useEffect` hook once in our code, no matter how many times we query Sharepoint. Let's take a look at our transformed App.js:</p>  

<p></p>  

```
    //App.js
    import { useSharePoint } from "./hooks/useSharePoint";

    export default function App() {
        const [ loading, error, data ] = useSharePoint('some_url');

        return (
          <>
            {loading && <div>Loading</div>}
            {error && <div>Error</div>}
            {data && <div>{data.response}</div>}
          </>
        );
    }
```  

<p></p>  

<p>App.js is now much more concise and much easier to read. The best part is that any developer on the project can use this hook and -- by simply passing in the right query string -- can make an asyncronous fetch request and have access to a loading, error, and data state without having to deal with Promises, or async/ await keywords, request headers, request bodies, etc.</p>  

<p>One caveat, however, is that this hook will send the request immediately once invoked . . . in other words, as soon as the calling Component is mounted. Sometimes, we don't want this behavior. Sometimes we may need to send the request upon and based on a user event, or maybe we need to wait for some other asyncronous operation to complete before we send the request. The hook in the above example is no good for any of these use cases.</p>  

<p>Borrowing inspiration again from `ApolloClient`, let's explore `useLazySharePoint()`:</p>  

<p></p>  

```
    //useLazySharePoint.js
    import { useState } from "react";
    import getSharePointData from "../utils/getSharePointData";

    export function useLazySharePoint(url) {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const get = () => {
          if (!loading && !error && !data) {
            setLoading(true);
            getSharePointData(url)
              .then(setData)
              .catch(setError)
              .finally(() => setLoading(false));
          }
        };

        return { 
            get,
            results: [ loading, error, data ]
        };
    }
```

<p></p>  

<p>In `useLazySharePoint()`, we move all of the logic out of the useEffect hook, into a new function (`get`) which is not called but instead returned from our hook. We now return an Object containing the `get` function and a `results` property which exposes our tuple. </p>  

<p>Back in our App Component, we can use this in several ways. One example would be as a sort of Promise chain, where we call `get()` only after our original request is fulfilled:</p>  

<p></p>  

```
    //App.js
    import { useEffect } from "react";
    import { useSharePoint } from "./hooks/useSharePoint";
    import { useLazySharePoint } from "./hooks/useLazySharePoint";

    export default function App() {
        const [ loading1, error1, data1 ] = useSharePoint('some_url');
        const { get, results: [ loading2, error2, data2 ] } = useLazySharePoint('some_other_url');

        useEffect(() => {
            if (data1) get();
        }, [data1])

        useEffect(() => {
            if (data2) {
                //do something with data2
            }
        }, [data2])

        return (
          <>
            {loading1 && <div>Loading</div>}
            {error1 && <div>Error</div>}
            {data1 && <div>{data1.response}</div>}
          </>
        );
    }
```  

<p></p>  

<p>Notice that we are able to name our three State values as we choose when destructuring. This is the exact reason that we return them in this way vs as an Object. This helps with readability and reusability, helping to keep our code concise and tidy.</p>  

<p>You can see it in action ***[here on codesandbox](https://codesandbox.io/p/sandbox/usefetch-p7c3h6?file=%2Fsrc%2FApp.js%3A15%2C1)***. Note that I've named the hook `useFetch` and the util function `mockFetch`; they were changed to `useSharePoint` and `getSharePointData` for narrative purposes here in the blog post. `mockFetch` simulates an asyncronous operation with a three-second `setTimeout()`. </p>  

<p>I hope this has demonstrated the value of using custom hooks, which is equal to but unique from the value of using util functions. Next time we will explore a few examples of custom hooks for managing state-like values in the url and local storage, hooks that expose a `[value, setValue]` tuple which will be familiar to anyone who has used the `useState` hook.</p>  
