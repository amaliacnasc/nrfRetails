import React from "react";
import {View, Text,} from 'react-native'
import '../../global.css'


export function HeaderTimeline() {
    return(
        <View
        style={{
            height: 144,
            backgroundColor: '#E6EDF9',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <Text
            style={{
                color: "#054FC7",
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 21
            }}
            >
                Linha do Tempo
            </Text>

            
        </View>
    )
}