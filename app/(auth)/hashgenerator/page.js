'use client'
import React from "react";
import { Input, Button } from "@nextui-org/react";
import bcrypt from 'bcryptjs';

const HashGenerator = () => {

    const [text, setText] = React.useState("");
    const [output, setOutput] = React.useState("");

    const hashGeneratorFxn = async () => {
        const hashPassword = await bcrypt.hash(text, 10);
        setOutput(hashPassword);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
            <Input 
                type="text"
                placeholder="Enter Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ marginBottom: "20px" }}
            />
            <Button 
                onClick={hashGeneratorFxn}
                style={{ width: "150px" , marginTop: "15px"}}
            >
                Generate Hash
            </Button>
            <p style={{ marginTop: "20px", fontFamily: "Arial, sans-serif", fontSize: "16px" }}>{output}</p>
        </div>
    );
};

export default HashGenerator;
