// PdfViewer.js

import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert,  } from 'react-native';
import Pdf from 'react-native-pdf';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share'
const PdfViewer = () => {
    const [pdfUri, setPdfUri] = useState<any>(null);
    let knowledge
    let circleColor = knowledge === 'Remember most concepts with minimal errors.' ? 'rgb(0, 0, 95)' : 'white';
    const createPdf = async () => {
        try {
            let options = {
                html: `<html>
       
        
         <body style="background-color: pink;">
                    <h1>This is a sample PDF</h1>
                    <p style="color: red;">Hello, this is a paragraph with red text.</p>
                    <div style="border-radius: 50%; height: 13px; width: 13px; background-color: ${circleColor}; border: 2px solid rgb(0, 0, 95);"></div>
                </body>
       </html>
          `,
                fileName: `report${Math.random()}`,
                directory: 'Downloads',
                base64: false,
            };

            //   const file = await RNHTMLtoPDF.convert(options);
            const pdfFile = await RNHTMLtoPDF.convert(options);
            const { filePath }: any = pdfFile;
            console.log(filePath);

            //   setPdfUri(filePath);
            sharePdf(filePath);
            //   setPdfUri(file.filePath);
            Alert.alert('PDF Generated', 'PDF has been created successfully!');
        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert('Error', 'Failed to generate PDF');
        }
    };

    const sharePdf = async (filePath: any) => {
        try {
            const options = {
                mimeType: 'application/pdf',
                UTI: 'com.adobe.pdf', // Optional, iOS only
            };

            await Share.open({ url: `file://${filePath}`, ...options });

            Alert.alert('PDF Shared', 'PDF has been shared successfully!');
        } catch (error) {
            console.error('Error sharing PDF:', error);
            Alert.alert('Error', 'Failed to share PDF');
        }
    };



    return (
        <View style={styles.container}>
            <Button title="Create PDF" onPress={createPdf} />

            {/* {pdfUri && (

                <Pdf
                    source={{ uri: pdfUri }}
                    style={{ flex: 1, backgroundColor: 'transparent', marginBottom: 5 }}
                />




                // <Pdf
                //   source={{ uri: pdfUri }}
                //   onLoadComplete={(numberOfPages, filePath) => {
                //     console.log(`number of pages: ${numberOfPages}`);
                //   }}
                //   onPageChanged={(page, numberOfPages) => {
                //     console.log(`current page: ${page}`);
                //   }}
                //   onError={(error) => {
                //     console.log('PDF load error:', error);
                //   }}
                //   style={styles.pdf}
                // />
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    pdf: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

export default PdfViewer; // Ensure PdfViewer is correctly exported
