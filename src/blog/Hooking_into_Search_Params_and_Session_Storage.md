---
title: "Hooking into Search Params and Local Storage"
description: "Lifting state way up"
date: "September 4, 2024"
---

# Hooking into Search Params and Local Storage
# 
<p></p>  
<p>We sometimes find situations where it may be necessary to share data across components or even across browser sessions by storing it above/ outside the context of React. </p>  
<p></p>  
<p>There are, of course, conventions for this: For sharing data across components outside normal React context, we have url search params, and for persisting data across browser sessions we have local storage.</p>  
<p></p>  
<p>This post will explore storing data in search params; at the end we will move this logic into a custom hook for a standardized developer experience.</p>  
<p></p>  

### Storing Data in Search Params
#  
<p></p>  
<p>`React-Router-Dom` gives us the ability to set and get params with the `useSearchParams` hook. This can be useful in a single-page React application where we are using `React-Router-Dom` for frontend routing with multiple routes. Imagine we have a handful or more routes, and at each route we have a component tree with a Context Provider at the top. Imagine each Context provider is unique and specific to one page, so that one page does not have access to another page's Context. Routing might look something like this:</p>  
<p></p>  

```
//App.jsx
...
    <Route 
        path='/home' 
        element={<Home/>} 
    />
    <Route 
        path='/all_people' 
        element={
          <AllPeopleProvider>
            <AllPeople/>
          </AllPeopleProvider>
        } 
    />
    <Route 
        path='/person_detail' 
        element={
          <PersonDetailProvider>
            <PersonDetail/>
          </PersonDetailProvider>
        } 
    />
...
```

<p></p>  
<p>Much like in a more traditional app with multiple html pages, here we lose access to one page's data (we lose the page's context) when we navigate to another page. And much like in that multi-page app, we can pass data in the url as params when navigating to a new page.</p>  
<p></p>   
<p>So in the above example, let's say the `AllPeople` page renders a table summarizing a list of people, and a user can select a person by clicking on the row to see an expanded view of that person's details. Selecting a person from the table navigates the user from '/all_people' to '/person_details'. AllPeople only needs limited data on each person; PersonDetail needs expanded data on the person, but only on one person.</p>  
<p></p>   
<p>AllPeople tells PersonDetail which person was selected like so: `/person_detail?id=29`, and PersonDetail can read the id using `useSearchParams` and properly load the context data from some external data source.</p>  
<p></p>   

```
//PersonDetailProvider.jsx
...
    const [ searchParams ] = useSearchParams();
    const id = searchParams.get('id');
...
```

<p></p>   
<p>Now let's imagine we have a search bar for our AllPeople table so our user can narrow down the list of people by first and/or last name. For this we develop an `<AllPeopleSearch/>` component that we render in AllPeople. We can of course store our search string in our AllPeople component State, passing the getter and setter into AllPeopleSearch as props -- a valid solution but what if our user wishes to share the results of a search with another user? By moving the search string out of component State and into the url we give the user a sharable url to their custom filtered table, and `useSearchParams` gives us the ability to do this. It also gives us the ability in our child AllPeopleSearch component to access the getter and setter without prop drilling. With this hook, we can not just read but also write to the params portion of the url while remaining on the page.</p>  
<p></p>   

```
//AllPeopleSearch.jsx
import { useSearchParams } from "react-router-dom";

export default function AllPeopleSearch() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const firstName = searchParams.get('first_name');
    const lastName = searchParams.get('last_name');

    const onChangeFirstName = (e) => {
      setSearchParams(
        (prev) => {
          prev.set('first_name', e.target.value);
          return prev;
        },
        { replace: true }
      );
    }
    
    const onChangeLastName = (e) => {
      setSearchParams(
        (prev) => {
          prev.set('last_name', e.target.value);
          return prev;
        },
        { replace: true }
      );
    }

    return (
        <>
            <input value={firstName} onChange={onChangeFirstName} placeholder="Search by First Name" />
            <input value={lastName} onChange={onChangeLastName} placeholder="Search by Last Name" />
        </>
    )
}
```

<p></p>   
<p>A rudimentary search component, just four lines of JSX, but there is a fair bit going on here with `useSearchParams`, so let's break that down. Each controlled input is bound to a variable which is equal to the return value of calling `searchParams.get` on a corresponding param. So far, this probably looks familiar from our id example above, but here we see that `useSearchParams` also exposes a `setSearchParams`, and this is where things get more interesting.</p>  
<p></p>  
<p>We can see that each of our onChange handlers calls setSearchParams to write changes to the url. `setSearchParams` can take two arguments; the first is the new state to set, and the second is a config object. We are setting the config object's `replace` property to `true` to replace the existing param ('first_name' or 'last_name' depending on which handler we're in) with the new state. In the first argument, we see that just as with `React.setState`, we can pass in a function which has access to the previous state. We can call `prev.set`, passing in our parameter name and its value.</p>  
<p></p>  
<p>`setSearchParams` sets a property (say 'first_name') on the params object, and by setting in this way we ensure the entire params object is used when setting the new params. This is important here because we may have multiple values stored as url params. We could directly set search params to a new object like this `setSearchParams('first_name', e.target.value)` but if there are any additional params they will be lost in the new set call. Calling `prev=>prev.set` is similar to spreading over the prev object, but doing it in this way requires the config object with `replace` equal to `true` to prevent possibly multiple 'first_name' values in the url.</p>  
<p></p>  
<p>There is a bit of duplication in the two onChange handlers. It would be nice to optimize this a bit. It would also be nice to move this library-specific business logic out of this component and abstract it for reuse in other components. We can accomplish both by developing a custom hook. What if we had a custom hook called `useQueryStringParams` that exposes a `[value, setValue]` tuple in the pattern of `useState`? Our search component might then look something like this:</p>  
<p></p>  

```
//AllPeopleSearch.jsx
import { useQueryStringParams } from "../hooks/useQueryStringParams";

export default function AllPeopleSearch() {
    const [firstName, setFirstName] = useQueryStringParams("first_name");
    const [lastName, setLastName] = useQueryStringParams("last_name");

    const handleChangeFirst = (e) => setName(e.target.value);
    const handleChangeLast = (e) => setAge(e.target.value);

    return (
        <>
            <input value={firstName} onChange={handleChangeFirst} placeholder="Search by First Name" />
            <input value={lastName} onChange={handleChangeLast} placeholder="Search by Last Name" />
        </>
    )
}
```

<p></p>  
<p>Now a much cleaner component, with a more standardized `useQueryStringParams` call looking very similar to a `useState` call. We pass in a string value to be used as the key in the params object. All of our `react-router-dom` logic has been moved into our own `useQueryStringParams` and made a bit more dynamic:</p>  
<p></p>  

```
//useQueryStringParams.jsx
import { useSearchParams } from "react-router-dom";

export function useQueryStringParams(key) {
  const [searchParams, setSearchParams] = useSearchParams({
    [key]: "",
  });
  const value = searchParams.get(key);

  const setValue = (newVal) => {
    if (!newVal) {
      searchParams.delete(key);
      setSearchParams(searchParams);
    } else {
      setSearchParams(
        (prev) => {
          prev.set(key, newVal);
          return prev;
        },
        { replace: true }
      );
    }
  };

  return [value, setValue];
}
```

<p></p>  
<p>Now, we just pass in a key into our custom hook, and all the magic happens under the hood. You may notice we've added a few lines inside `setValue`, which helps to keep our url clean. If a change event in the input element results in an empty string, we call `searchParams.delete(key)` and pass the new searchParams into `setSearchParams` to remove the orphaned key from the url.</p>  
<p></p>  
<p>You can view a working example ***[here on codesandbox](https://codesandbox.io/p/sandbox/usequerystringparams-2fdtdv?file=%2Fsrc%2Fhooks%2FuseQueryStringParams.js%3A1%2C1-25%2C2)***.</p>  
<p></p>  