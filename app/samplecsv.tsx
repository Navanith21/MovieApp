import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';

export function App() {
    const [csvData, setCsvData] = useState<any[]>([]);

    useEffect(() => {
        // Path to the CSV file - adjust path according to where your file is
        const path = RNFS.DocumentDirectoryPath + 'customer-100.csv';

        // Read the file as a string
        RNFS.readFile(path, 'utf8')
            .then((contents) => {
                // Parse CSV content using PapaParse
                const results = Papa.parse(contents, {
                    header: true,  // if your CSV has headers
                });
                setCsvData(results.data);  // set the parsed data in state
            })
            .catch((err) => {
                console.log('Error reading file:', err);
            });
    }, []);

    return (
        <ScrollView style={{padding: 20}}>
            {csvData.map((row, index) => (
                <View key={index} style={{marginBottom: 10}}>
                    {Object.entries(row).map(([key, value]) => (
                        <Text key={key}>
                            {key}: value
                        </Text>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}
