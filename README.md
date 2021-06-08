# QR code encoding for binary data
A small utility library for efficiently encoding binary data into QR codes.

## Motivation
While qr codes can theoretically encode binary data, most libraries for creating and scanning QR codes don't handle binary data correctly. Code points not defined in ISO 8859-1 are often ignored or replaced by other code points. This utility mitigates that issue by encoding binary as a string of digits.

## Is this library for me?
In most cases encoding binary data in Base 64 is the way to go. If this leads to QR codes of an acceptable size for your use case and expected amounts of data then this is likely the way to go. If you face issues with the size of the resulting QR codes or scanning the codes than this library might help mitigate that issues a bit.

## How much does this method reduce QR code size?
This method reduces the size of the content (the bits that are written as a qr code) for real binary data by between 1/4 and 1/3.
