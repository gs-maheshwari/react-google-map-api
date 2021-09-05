import React, { useEffect, useState } from "react";
import { CustomResponse, ServiceResponse, State } from "./use-service.types";

const useService = (url: string) : CustomResponse => {
    const [state, setCallState] = useState<State>(State.IDEAL);
    const [response, setResponse] = useState<ServiceResponse>();
    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setCallState(State.LOADING);
            // use ../assets/mock/upcoming-launch.json for mock
            const response = await fetch(url,{
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
              });
             if(response.ok){
                const data = await response.json();
                setResponse(data);
                setCallState(State.SUCCESS);
             } else {
                setCallState(State.ERROR);
             }
        };
        try {
            fetchData();
        } catch {
            setCallState(State.ERROR);
        }
    }, [url]);
    
    return {
        state,
        data: response
    }
}

export default useService