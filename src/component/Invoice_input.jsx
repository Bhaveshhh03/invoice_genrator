import React, { useEffect, useState } from 'react';
import './Invoice_input.css';
import { ToWords } from 'to-words';
const InvoiceInput = () => {
    const [sellername, setsellername] = useState('');
    const [sellerstate, setsellerstate] = useState('');
    const [billerstate, setbillerstate] = useState('');
    const [Amountword, setAmountword] = useState('');
    const [logoimg, setlogoimg] = useState("");
    const [signimg, setsignimg] = useState('');
    const [sellercity, setsellercity] = useState('');
    const [billercity, setbillercity] = useState('')
    console.log(sellername, sellerstate, billerstate)
    const [rows, setRows] = useState([
        {
            description: '',
            up: '',
            qty: '',
            discount: '',
            taxRate: 18,
            taxType: '',
            taxAmount: 0,
            total: 0
        }
    ]);

    const toWords = new ToWords();

    const printInvoice = () => {
        window.print();
    };

    const handleRowChange = (index, name, value) => {
        const updatedRows = rows.map((row, i) =>
            i === index ? { ...row, [name]: value } : row
        );
        setRows(updatedRows);
    };

    const addRow = () => {
        setRows([...rows, { description: '', up: '', qty: '', discount: '', taxRate: 18, taxType: '', taxAmount: '', total: '' }]);

    };

    const deleteRow = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    const calculateNetAmount = (row) => {
        const { up, qty, discount } = row;
        return (up * qty) - discount;
    };

    const calculateTaxAmount = (netAmount, taxRate) => {
        return (netAmount * taxRate) / 100;
    };
    const calculatecgstsgstTaxAmount = (netAmount, taxRate) => {
        var halftaxrate = (taxRate / 2)
        return ((netAmount * halftaxrate) / 100) * 2;
    };

    const calculateTotal = (netAmount, taxAmount) => {
        return netAmount + taxAmount;
    };
    const cgst_sgstTotal = (netAmount, cgst_sgst_taxamount) => {
        return netAmount + cgst_sgst_taxamount;
    }
    const handlelogoimage = (e) => {
        setlogoimg(e.target.files[0]);
    }
    const handlesignimg = (e) => {
        setsignimg(e.target.files[0]);
    }

    useEffect(() => {
        let totalAmount = 0;
        
            totalAmount = rows.reduce((acc, row) => {
                const netAmount = calculateNetAmount(row);
                const taxAmount = calculateTaxAmount(netAmount, row.taxRate);
                return acc + calculateTotal(netAmount, taxAmount);
            }, 0);
        
        setAmountword(toWords.convert(totalAmount, { currency: true }));
    }, [rows, sellerstate, billerstate]);
    return (
        <div className="container">
            {/* Invoice Header */}
            {logoimg ? <img src={URL.createObjectURL(logoimg)} alt='' style={{ height: '60px', width: '200px', marginLeft: '30px' }} /> : null}
            <div className="row">
                <div className="col-6">
                    <div className="input-group">
                        <input type="file" className="form-control" id='noprint' aria-label="Upload" onChange={handlelogoimage} />
                    </div>

                </div>
                <div className="col-6">
                    <div className='description' style={{ marginTop: "-70px" }}>
                        <b>Tax Invoice/Bill of Supply/Cash Memo</b><br />
                        <p>(Original for Recipient)</p>
                    </div>
                </div>
            </div>

            {/* Seller and Order Details */}
            <div className="row">
                <div className="col-6">
                    {/* Seller Details */}
                    <b>Sold by:</b>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text" id='noprint'>Name</span>
                        <input type="text" className="form-control" value={sellername} onChange={(e) => setsellername(e.target.value)} />
                    </div>
                    <div className="input-group input-group-sm">
                        <span className="input-group-text" id='noprint'>Address</span>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text" id='noprint'>City, State, Pincode</span>
                        <input type="text" className="form-control"  value={sellercity} onChange={(e) => setsellercity(e.target.value.toUpperCase())} />
                        <input type="text" className="form-control" id='stateinput' value={sellerstate} onChange={(e) => setsellerstate(e.target.value.toUpperCase())} />
                        <input type="number" className="form-control" />
                    </div>
                    <br></br>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text">PAN No:</span>
                        <input type="number" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text">GST Registration No:</span>
                        <input type="number" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm">
                        <span className="input-group-text">Order No:</span>
                        <input type="number" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm">
                        <span className="input-group-text">Order Date:</span>
                        <input type="date" className="form-control" />
                    </div>
                    <br></br>
                    <button type="button" className="btn btn-success" onClick={printInvoice}>Print</button>
                </div>

                {/* Billing and Shipping Details */}
                <div className="col-6">
                    <b>Billing Details:</b>
                    <div className="input-group input-group-sm">
                        <span className="input-group-text" id='noprint'>Name</span>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text" id='noprint'>Address</span>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text" id='noprint'>City, State, Pincode</span>
                        <input type="text" className="form-control" value={billercity} onChange={(e) => setbillercity(e.target.value.toUpperCase())} />
                        <input type="text" className="form-control" id='stateinput' value={billerstate} onChange={(e) => setbillerstate(e.target.value.toUpperCase())} />
                        <input type="number" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm">
                        <span className="input-group-text">State/UT Code:</span>
                        <input type="number" className="form-control" />
                    </div><br></br>
                    <b>Shipping Details:</b>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text" id='noprint'>Name</span>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text" id='noprint'>Address</span>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text" id='noprint'>City, State, Pincode</span>
                        <input type="text" className="form-control" value={billercity} onChange={(e) => setbillercity(e.target.value.toUpperCase())} />
                        <input type="text" className="form-control"id='stateinput'  value={billerstate} onChange={(e) => setsellerstate(e.target.value.toUpperCase())} />
                        <input type="number" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text">State/UT Code:</span>
                        <input type="number" className="form-control" />
                    </div><br></br>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text">Place of Supply:</span>
                        <input type="text" className="form-control" readOnly value={sellerstate} />
                    </div>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text">Place of Delivery:</span>
                        <input type="text" className="form-control" readOnly value={billerstate} />
                    </div>
                    <div className="input-group input-group-sm">
                        <span className="input-group-text">Invoice Number:</span>
                        <input type="number" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm ">
                        <span className="input-group-text">Invoice Details:</span>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group input-group-sm">
                        <span className="input-group-text">Invoice Date:</span>
                        <input type="date" className="form-control" />
                    </div>
                </div>
            </div><br></br>

            {/* Invoice Items Table */}
            <table className="table table-bordered">
                <thead>
                    <tr className="table-secondary">
                        <th scope="col">SI.NO</th>
                        <th scope="col">Description</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Net Amount</th>
                        <th scope="col">Tax Rate</th>
                        <th scope="col">Tax Type</th>
                        <th scope="col">Tax Amount</th>
                        <th scope="col">Total</th>
                        <th scope="col" className='noborder'>
                            <button type="button" className="btn btn-success" onClick={addRow}>+</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        const netAmount = calculateNetAmount(row);
                        const taxAmount = calculateTaxAmount(netAmount, row.taxRate);
                        const total = calculateTotal(netAmount, taxAmount);
                        const cgst_sgst_taxamount = calculatecgstsgstTaxAmount(netAmount, row.taxRate);
                        const cgst_sgsttotal = cgst_sgstTotal(netAmount, cgst_sgst_taxamount);
                       
                        return (
                            (sellerstate === billerstate ? <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={row.description}
                                        id='showdescp'
                                        onChange={(e) => handleRowChange(index, 'description', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={row.up}
                                        id='showdataup'
                                        
                                        onChange={(e) => handleRowChange(index, 'up', parseFloat(e.target.value))}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={row.qty}
                                        id='showdata'
                                       
                                        onChange={(e) => handleRowChange(index, 'qty', parseInt(e.target.value, 10))}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={row.discount}
                                        id='showdata'
                                        
                                        onChange={(e) => handleRowChange(index, 'discount', parseFloat(e.target.value))}
                                    />
                                </td>
                                <td>{netAmount.toFixed(2)}</td>
                                <td>
                                    9%
                                    <br /><br/><br/>
                                    9%
                                </td>
                                <td>
                                    CGST<br /><br /><br />
                                    SGST
                                </td>
                                <td>{taxAmount.toFixed(2) / 2}<br /><br /><br />{taxAmount.toFixed(2) / 2}</td>
                                <td>{total.toFixed(2)}</td>
                                <td className='noborder'>
                                    <button type="button" className="btn btn-danger" onClick={() => deleteRow(index)}>X</button>
                                </td>
                            </tr>
                                :
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            value={row.description}
                                            cols={70}
                                            rows={2}
                                            onChange={(e) => handleRowChange(index, 'description', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={row.up}
                                            onChange={(e) => handleRowChange(index, 'up', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={row.qty}
                                            onChange={(e) => handleRowChange(index, 'qty', parseInt(e.target.value, 10))}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={row.discount}
                                            onChange={(e) => handleRowChange(index, 'discount', parseFloat(e.target.value))}
                                        />
                                    </td>
                                    <td>{netAmount.toFixed(2)}</td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            readOnly
                                            value={"18%"}

                                        />
                                    </td>
                                    <td>
                                        IGST
                                    </td>
                                    <td>{taxAmount.toFixed(2)}</td>
                                    <td>{total.toFixed(2)}</td>
                                    <td className='noborder'>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteRow(index)}>X</button>
                                    </td>
                                </tr>)
                        );
                    })}
                    {/* footer */}
                    <tr>
                        <td colSpan={8} style={{ fontSize: "17px", fontWeight: "bold" }}>Total:</td>
                        <td>{sellerstate === billerstate ? 
                            rows.reduce((acc, row) => acc + calculatecgstsgstTaxAmount(calculateNetAmount(row), row.taxRate), 0).toFixed(2)
                         : 
                            rows.reduce((acc, row) => acc + calculateTaxAmount(calculateNetAmount(row), row.taxRate), 0).toFixed(2)
                        }</td>
                        <td>{sellerstate === billerstate ? 
                            rows.reduce((acc, row) => acc + cgst_sgstTotal(calculateNetAmount(row), calculatecgstsgstTaxAmount(calculateNetAmount(row), row.taxRate)), 0).toFixed(2)
                          :
                            rows.reduce((acc, row) => acc + calculateTotal(calculateNetAmount(row), calculateTaxAmount(calculateNetAmount(row), row.taxRate)), 0).toFixed(2)
                         }</td>
                    </tr>
                    <tr>
                        <td colSpan={10} style={{ fontWeight: "bold" }}>Amount in Words:<br></br>
                            {Amountword}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={10} >
                            <div className="row">
                                <div className="col-8">
                                </div>
                                <div className="col-4" style={{ justifyContent: "end", alignItems: "end" }}>
                                    <div className="input-group input-group-sm mb-3 ">
                                        <span className="input-group-text" id="inputGroup-sizing-sm" style={{ fontWeight: "bold", fontSize: "16px" }}>For</span>
                                        <input type="text" className="form-control" style={{ fontWeight: "bold", fontSize: "16px" }} readOnly value={sellername} />
                                    </div>
                                    {signimg ? <img src={URL.createObjectURL(signimg)} alt='' style={{ height: '40px', width: '150px', marginTop: "-10px" }} /> : null}
                                    <div className="input-group">
                                        <input type="file" className="form-control" id='noprint' onChange={handlesignimg} />
                                    </div>
                                    <b>Authorized Signature</b>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="row">
                <div className="col-8" style={{display:"flex"}}>
                    <b>Reverse Charges:</b>
                    <select class="form-select form-select-sm" aria-label="Small select example" id='selectborder' style={{width:'100px', fontWeight:"bold"}}>
                        <option selected>Select</option>
                        <option value="1">Yes</option>
                        <option value="2">NO</option>
                       
                    </select>
                </div>
                <div className="col-4" style={{ justifyContent: "end", alignItems: "end" }}>

                </div>
            </div>

        </div>
    );
};

export default InvoiceInput;
