function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const thingId = `UDMIduino-000`;
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    const jsonData = JSON.parse(jsonString);
    const value = {
        udmi: {
            properties: {
                version: 1,
                timestamp: 0,
                points: {
                    lux_level: {
                        present_value: jsonData.present_value
                    },
                    lum_value: {
                        present_value: 0
                    },
                    dimmer_value: {
                        present_value: 0
                    }
                }
            }
        }
    };

    return Ditto.buildDittoProtocolMsg(
        `arup.eight.fitzroy`,
        thingId,
        `things`,
        `twin`,
        `commands`,
        `modify`,
        `/features`,
        headers,
        value
    );
}