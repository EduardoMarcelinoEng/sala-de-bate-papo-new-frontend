import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import WrapperLoad from "./style";

export default function Load(){

    useEffect(()=>{
        if(window.location.pathname){

        }
    }, [window.location.pathname]);

    return (
        <WrapperLoad>
            <Spinner />
        </WrapperLoad>
    );
}