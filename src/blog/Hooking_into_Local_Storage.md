---
title: "Hooking into Local Storage"
description: "A custom hook for a standardized developer experience"
date: "September 5, 2024"
---

# Hooking into Local Storage
# 
<p></p>  
<p>We sometimes find situations where it may be necessary to share data across components or even across browser sessions by storing it above/ outside the context of React, without leaning on an external State Management library. </p>  
<p></p>  
<p>There are, of course, conventions for this: For sharing data across components outside normal React context, we can use url search params, and for persisting data across browser sessions we can use local storage.</p>  
<p></p>  
<p>In ***[Hooking into Search Params](/blog/Hooking_into_Search_Params)***, we explored storing data in the url, and created a custom hook to foster a standardized developer experience. This post builds on that, so it's recommended that you start there.</p>  
<p>Otherwise, let's talk about local storage and develop a `useLocalStorage` hook!</p>  
<p></p>  

### Storing Data in Local Storage
#  

<p>In JavaScript, the Window api provides us with a `localStorage` property that we can use to access storage associated with our current base url. Because `localStorage` has no expiration, our data persists across browser sessions at this base url. We can leverage this to save user preferences that can be retrieved by our Single Page React application each time a user returns from the same browser, thus creating a more personalized experience.</p>  
<p></p>  
<p>Let's consider a scenario where this might be useful. Imagine there's a restaurant company called SDS Inc which operates as a franchisee of several concepts. Let's say Panera, Chipotle, and Cava (in reality not all of these offer franchising, but hey, we're pretending). When a user navigates to the SDS Inc web portal, they are asked to choose from a list of available concepts, and based on their selection, they are redirected to that concept's portal and/or that concept's context data is loaded from an external source. Rather than presenting them with this choice every time, we save their selection in local storage for a more streamlined experience.</p>  
<p></p>  
<p>We can write to local storage like so: `localStorage.setItem('concept', JSON.stringify('Panera'))`. And we can retrieve data with: `JSON.parse(localStorage.getItem('concept'))`.</p>  
<p></p>  
<p>So, at the home page of our corporate web portal, we might save user selections like this:</p>  
<p></p>  

```
//Home.jsx
import { useState, useEffect } from "react";

export default function App() {
  const [concept, setConcept] = useState(() =>
    JSON.parse(localStorage.getItem("concept"))
  );

  const conceptOptions = ["Panera", "Chipotle", "Cava"];

  useEffect(() => {
    localStorage.setItem("concept", JSON.stringify(concept));
  }, [concept]);

  return (
    <div className="App">
      <h1>SDS Inc</h1>
      <h4>Please choose your Concept</h4>
      {conceptOptions.map((option) => (
        <button onClick={() => setConcept(option)}>{option}</button>
      ))}
      <h4>{`Concept stored in localStorage: ${concept || ""}`}</h4>
    </div>
  );
}
```
<p></p>  
<p>This works, but we can do better. What we want is to tuck away all that JavaScript into a custom `useLocalStorage` hook that exposes the familiar `[ value, setValue ]`. In the ***[live codesandbox example](https://codesandbox.io/p/sandbox/uselocalstorage-l6tzrl)***, we see that with the custom hook, Home.jsx now looks like this:</p>  
<p></p>  

```
//Home.jsx
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [concept, setConcept] = useLocalStorage("concept");

  const conceptOptions = ["Panera", "Chipotle", "Cava"];

  return (
    <div className="App">
      <h1>SDS Inc</h1>
      <h4>Please choose your Concept</h4>
      {conceptOptions.map((option) => (
        <button onClick={() => setConcept(option)}>{option}</button>
      ))}
      <h4>{`Concept stored in localStorage: ${concept}`}</h4>
    </div>
  );
}
```

<p></p>  
<p>And our hook:</p>  
<p></p>  

```
//useLocalStorage.jsx
import { useState, useEffect } from "react";

export function useLocalStorage(key) {
    const [ value, setValue ] = useState(() => JSON.parse(localStorage.getItem(key)));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [ value, setValue ];
}
```
<p></p>  
<p>It may not be a lot of code, but what we've done here is not only abstracting it for re-use (thus staying DRY), but also helping to provide a standardized developer experience with a common hook pattern.</p>  
<p></p>  
<p>Try it out ***[here on codesandbox](https://codesandbox.io/p/sandbox/uselocalstorage-l6tzrl)***. When you first navigate to the example, you will see there is nothing set in local storage (the h4 at the bottom should display "Concept stored in localStorage: ". Make a selection to see the update in the UI. Now you can close the browser window, reopen it and see your selection has persisted from the last session.</p>  
<p></p>  