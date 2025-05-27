import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import Papa from 'papaparse';

export function App() {
    const [csvData, setCsvData] = useState<any[]>([]);

    useEffect(() => {
        const loadCSV = async () => {
            try {
                // Load CSV file from project assets folder (relative path)
                const asset = Asset.fromModule(require('./assets/customers-100.csv'));
                await asset.downloadAsync();

                // Read the content
                const fileContent = await FileSystem.readAsStringAsync(typeof asset.localUri === "string" ? asset.localUri : "");

                // Parse CSV
                const parsed = Papa.parse(fileContent, {
                    header: true,
                    skipEmptyLines: true,
                });

                setCsvData(parsed.data);
            } catch (err) {
                console.error('Error loading CSV:', err);
            }
        };

        loadCSV();
    }, []);
    return (
        <ScrollView style = {}
        padding: 20
    }
}>
    {
        csvData.map((item, index) => (
            <View key = {index}
        style = {
        {
            marginBottom: 10
        }
    }>
        <Text>Name
    :
        {
            item.name
        }
        </Text>
        < Text > Age
    :
        {
            item.age
        }
        </Text>
        < Text > City
    :
        {
            item.city
        }
        </Text>
        < /View>
    ))
    }
    </ScrollView>
)
};

