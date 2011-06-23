using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.IO;
using System.Text;

namespace DES
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Reading file...");
            string file = @"C:\Users\ost\code\projects\littlelogger\server\src\bin.txt";

            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            des.Padding = PaddingMode.Zeros;
            
            string strkey = "1b0802e3d6";
            strkey = getMd5Hash(strkey);
            strkey = strkey.Substring(0, 8);
            Console.WriteLine("Using key: " + strkey);

            strkey = "12345678";
            Console.WriteLine("Using key: " + strkey);

            System.Text.ASCIIEncoding str2byte = new ASCIIEncoding();

            byte[] key = str2byte.GetBytes(strkey);
            //Console.WriteLine("Byte");
            //foreach (byte b in key)
            //{
            //    Console.WriteLine(b);
            //}

            des.Key = key;
            //des.BlockSize = 64;
            des.Padding = PaddingMode.Zeros;


            Console.WriteLine("Creating byte array");
            //byte[] buffer = ConvertFileToByteArray(file);
            ConvertFileToByteArray(file);
            //Console.WriteLine("12345678:");
            //System.Text.ASCIIEncoding enc = new ASCIIEncoding();
            //byte[] num = enc.GetBytes("123456789");

            //foreach (byte c in num)
            //{
            //    Console.WriteLine(Convert.ToString(c, 2));
            //}
            //System.Text.Encoding enc3 = System.Text.Encoding.ASCII;
            //string myString = enc3.GetString(num2);
            //Console.WriteLine("en3: " + myString);

            //            Console.WriteLine("Bytes: " + buffer.Length.ToString());          

            //Console.WriteLine("Decrypting...");
            //MemoryStream ms = new MemoryStream(buffer);
            //CryptoStream cStream = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Read);
            //StreamReader sr = new StreamReader(cStream);

            //string str = sr.ReadToEnd();

            //sr.Close();
            //cStream.Close();
            //ms.Close();

            //System.Console.Write(str);
            Console.Write("\nPress enter to exit...");
            Console.Read();



        }

        static string getMd5Hash(string input)
        {
        // Create a new instance of the MD5CryptoServiceProvider object.
        MD5 md5Hasher = MD5.Create();

        // Convert the input string to a byte array and compute the hash.
        byte[] data = md5Hasher.ComputeHash(Encoding.UTF8.GetBytes(input));

        // Create a new Stringbuilder to collect the bytes
        // and create a string.
        StringBuilder sBuilder = new StringBuilder();

        // Loop through each byte of the hashed data 
        // and format each one as a hexadecimal string.
        for (int i = 0; i < data.Length; i++)
        {
            sBuilder.Append(data[i].ToString("x2"));
        }

        // Return the hexadecimal string.
        return sBuilder.ToString();
    }
//        public static byte[] ConvertFileToByteArray(string fileName)
        public static void ConvertFileToByteArray(string fileName)
        {
            BinaryReader binReader =
                new BinaryReader(File.Open(fileName, FileMode.Open));
            try
            {
                byte[] bytes = new byte[64];

                while (true)
                {
                    byte b = binReader.ReadByte();
                    Console.WriteLine(Convert.ToString(b, 2));
                }
            }

            catch (EndOfStreamException e)
            {
                Console.WriteLine("{0} caught and ignored. " +
                    "Using default values.", e.GetType().Name);
            }
            finally
            {

                binReader.Close();
            }
        }

    }
}
