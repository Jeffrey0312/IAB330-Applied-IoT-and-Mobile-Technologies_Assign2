import React,{useState,useEffect} from 'react';
import SourceCode from "./SourceCode.json";
function Showdata() {
    const data=  [{"id":"12e9e91de32c4da1e1efe74bfd27979b","key":"12e9e91de32c4da1e1efe74bfd27979b","value":{"rev":"1-28abba9f7afe88dbd9461d1868ff5bcd"},"doc":{"_id":"12e9e91de32c4da1e1efe74bfd27979b","_rev":"1-28abba9f7afe88dbd9461d1868ff5bcd","topic":"doctor","usertype":"doctor","user":"John","timestamp":"","latitude":-27.476613108467365,"longitude":153.02817776178523}},
    {"id":"12e9e91de32c4da1e1efe74bfd2c256c","key":"12e9e91de32c4da1e1efe74bfd2c256c","value":{"rev":"1-9f88fe2d6ebaafbd029ac979e8ccb425"},"doc":{"_id":"12e9e91de32c4da1e1efe74bfd2c256c","_rev":"1-9f88fe2d6ebaafbd029ac979e8ccb425","topic":"doctor","user":"Mark","timestamp":"2021-10-26T22:02:22.841Z","latitude":-27.47659334239127,"longitude":153.0281811355699,"usertype":"doctor"}},
    {"id":"12e9e91de32c4da1e1efe74bfd2c3860","key":"12e9e91de32c4da1e1efe74bfd2c3860","value":{"rev":"1-535077e29d1451c7fa6ac27b4feba7ce"},"doc":{"_id":"12e9e91de32c4da1e1efe74bfd2c3860","_rev":"1-535077e29d1451c7fa6ac27b4feba7ce","topic":"doctor","user":"Mark","timestamp":"2021-10-26T22:02:27.841Z","latitude":-27.476670907123548,"longitude":153.02818294974466,"usertype":"doctor"}}];
  
  return (
    <div className="Showdata">
     {
       data && data.length>0 && data.map((item)=><p>{item.id}</p>)
     }
    </div>
  );
}

export default Showdata;