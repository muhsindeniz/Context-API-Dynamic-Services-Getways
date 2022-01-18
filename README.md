# Context API, React Hooks Dynamic Services Getways

We use the `axios` library when we are going to do service-related operations in React projects. We have to constantly write functions like `axios.get`, `axios.post`, `axios.put`, `axios.delete` every time a transaction is made. Using the axios structure continuously in the same page or component makes the codes more complex.

As a solution to this, we can make it simpler and more useful by combining the structures that we will use continuously with `Context API` and `Functional Programming`.

If the backend structure we are using is the same in `get, post, delete, put` structures, not using this structure will save you time and allow you to make a cleaner structure.

To put it simply: A js file named servicesGetWays has been defined in the hooks folder, and there are `GET, POST, DELETE, PUT` functions that we will use constantly in that file.

I separated each structure into different functions and made it a callable and usable structure. I used the `useMemo` function to avoid unnecessary requests to the server by calling these methods once and then to take advantage of the cache.

For example, for the GET method:

<code>
  
      let useGetData = () => {
      const { token, setToken } = useContext(GlobalSettingsContext)

      let call = useMemo(() => async (action, params) => {

        let { query } = params;
        try {
            if (token) {
                let {data: {result, result_message}} = await axios.get(query ? `API_URL/${action}?${qs.stringify(query)}` : `API_URL/${action}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'x-api-lang': 'TR'
                    }
                })

                if (result_message && result_message.type === 'token_expire') {
                    Cookies.remove("token")
                    setToken(null);
                    return (result_message.message)
                }
                else if (!result && result_message.type === 'error')
                    throw Error(result_message.message)
                else
                    return ({ result, result_message })

            } else {
                throw new Error({ status: 404 })
            }
        }
        catch (error) {
            if (error) {
                if (error?.response?.status === 401)
                    throw ({ code: 401, message: error.message })
                if (error?.response?.status === 404)
                    throw ({ code: 404, message: '404 We couldn't find what you're looking for.' })
                else if (error?.message === 'Entity not found')
                    throw ({ code: 0, message: 'Could not find the records you are looking for.' })
                else
                    throw ({ code: 0, message: error.message })
            }
        }
      }, [token])
      return call
    } 
  
     export { useGetData }
</code>

By adding the action and params values that come in this way to the necessary places in axios, a structure was created that allows the desired data to be retrieved with the parameters.

To use this structure, we first need to import the `ServiceGetways` component to our page.

`import { useGetData, useDeleteData, usePostData, useUploadFile, usePutData } from '../../Hooks/ServiceGetways';`

then we need to assign these structures to a variable:

`let getData = useGetData();`

After the identification process, all we have to do is write the name of the structure we want to use and write which API collection part to request:

`
getData("news", { query: { id: newId } }).then(({ result, result_message }) => {
  setNews(result)
})
`

In this way, we communicate with the service by entering the necessary parameters with a simple function. At the same time, Authentication Token parameters checks are made in these functions.
