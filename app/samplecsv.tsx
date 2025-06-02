import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';

export function App( ) {
    const [csvData, setCsvData] = useState<any[]>([]);

    useEffect(() => {
        // Path to the CSV file - adjust path according to where your file is
        const path = FileSystem.documentDirectory + 'customer-100.csv';

        // Read the file as a string
        FileSystem.readAsStringAsync(path, { encoding: FileSystem.EncodingType.UTF8 })
            .then((contents: string) => {
                // Parse CSV content using PapaParse
                const results = Papa.parse(contents, {
                    header: true,  // if your CSV has headers
                });
                setCsvData(results.data);  // set the parsed data in state
            })
            .catch((err: any) => {
                console.log('Error reading file:', err);
            });
    }, []);

    return (
        <ScrollView style={{padding: 20}}>
            {csvData.map((row, index) => (
                <View key={index} style={{marginBottom: 10}}>
                    {Object.entries(row).map(([key, value]) => (
                        <Text key={key}>
                            {key}: {String(value)}
                        </Text>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}
