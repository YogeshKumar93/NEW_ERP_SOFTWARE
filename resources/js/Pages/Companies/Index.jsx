import React, { useState, useRef, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "@/Layouts/AppLayout";
import useShortcuts from "@/Hooks/useShortCuts";
import CommonTable from "@/Components/Common/CommonTable";
import CommonFormModal from "@/Components/Common/CommonFormModal";
import { useForm } from "@inertiajs/react";
import SelectStates from "@/Components/Common/SelectStates";

export default function Index({ companies = [], states = [] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [companyList, setCompanyList] = useState(companies ?? []);
  const tableRef = useRef(null);

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gst_registered: 'yes',
    gstin: '',
    pan: '',
    currency: 'INR',
    financial_year_from: '',
    books_beginning_from: '',
  });

  // Refs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);
  const gstinRef = useRef(null);
  const panRef = useRef(null);
  const fyRef = useRef(null);
  const booksRef = useRef(null);
  const submitRef = useRef(null);


  useEffect(() => {
    setCompanyList(companies);
    setActiveIndex(0); // Nayi company aane par wapas top par le jao
  }, [companies]);

  useEffect(() => {
    const handleGlobalCreate = () => toggleCreate();
    window.addEventListener('open-company-modal', handleGlobalCreate);
    return () => window.removeEventListener('open-company-modal', handleGlobalCreate);
  }, []);

  const toggleCreate = () => {
    setIsFormOpen(true);
    setTimeout(() => nameRef.current?.focus(), 50);
  };

  const handleBack = () => {
    if (isFormOpen) setIsFormOpen(false);
    else window.history.back();
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) nextRef.current.focus();
      else handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('companies.store'), {
      onSuccess: () => {
        reset();
        setIsFormOpen(false);

        // tableRef.current?.refresh();
      },
      
      onError: (err) => {
        console.error("Form Submission Error:", err);
      }
    });
  };




  useShortcuts({
    'alt+c': () => setIsFormOpen(true),
    'Escape': () => setIsFormOpen(false),
    'ArrowDown': () => !isFormOpen && setActiveIndex(prev => (prev < companyList.length - 1 ? prev + 1 : prev)),
    'ArrowUp': () => !isFormOpen && setActiveIndex(prev => (prev > 0 ? prev - 1 : prev)),
    'Enter': () => {
      if (!isFormOpen && companyList[activeIndex]) {
        console.log("Selected:", companyList[activeIndex]);
        // Yahan selection logic daalein
      }
    }
  }, isFormOpen);

  return (
    <AppLayout title="Companies">
      <div className="flex flex-col h-full bg-[#f4f4f4] font-mono overflow-hidden">
        <div className="bg-[#004a4d] text-[#e0f2f1] text-[10px] p-1 flex justify-between px-4 shadow-md uppercase tracking-wider shrink-0">
          <span>Biggbrains 4.0 | Gateway of ERP {'>'} Companies</span>
          <span className="flex gap-4">
            <span className="underline decoration-yellow-400">K</span>:Company | <span className="underline decoration-yellow-400">C</span>:Create
          </span>
        </div>

        <div className="flex-1 relative flex p-4 overflow-hidden">
          <CommonTable
            ref={tableRef}
            title="Select Company"
            headers={["Company Name", "Phone", "Email", "GSTIN", "State", "Address", "FY From", "Books From"]}
            data={companyList}
            columns={["name", "phone", "email", "gstin", "state", "address", "financial_year_from", "books_beginning_from"]}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onRowSelect={(company) => console.log("Selected:", company)}
          />

          <CommonFormModal
            isOpen={isFormOpen}
            title="Company Creation"
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            submitRef={submitRef}
            width="w-[850px]"
          >
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-[11px] bg-[#e3f2fd] p-4 border border-blue-200">

              {/* Left Column */}
              <div className="space-y-2">
                <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-2 uppercase">Contact Details</h3>

                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700 shrink-0">Name:</label>
                  <input ref={nameRef} type="text" value={data.name} onChange={e => setData('name', e.target.value.toUpperCase())} onKeyDown={(e) => handleKeyDown(e, emailRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                </div>

                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700 shrink-0">Email:</label>
                  <input ref={emailRef} type="email" value={data.email} onChange={e => setData('email', e.target.value)} onKeyDown={(e) => handleKeyDown(e, phoneRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                </div>

                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700 shrink-0">Phone:</label>
                  <input ref={phoneRef} type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} onKeyDown={(e) => handleKeyDown(e, addressRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                </div>

                <div className="flex items-start">
                  <label className="w-32 font-bold pt-1 text-gray-700 shrink-0">Address:</label>
                  <textarea ref={addressRef} rows="2" value={data.address} onChange={e => setData('address', e.target.value)} onKeyDown={(e) => handleKeyDown(e, cityRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none resize-none" />
                </div>

                <div className="flex items-center mb-2">
                  <label className="w-32 font-bold text-gray-700">State:</label>
                  <SelectStates
                    states={states}
                    value={data.state}
                    inputRef={stateRef}
                    onChange={e => setData('state', e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, pincodeRef)}
                    error={errors.state}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-32 font-bold text-gray-700 shrink-0">Pincode:</label>
                  <input ref={pincodeRef} type="text" value={data.pincode} onChange={e => setData('pincode', e.target.value)} onKeyDown={(e) => handleKeyDown(e, gstinRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-2 uppercase">Statutory Details</h3>
                  <div className="space-y-2">
                    {/* GST Registered */}
                    <div className="flex items-center">
                      <label className="w-32 font-bold text-gray-700 shrink-0">
                        GST Registered:
                      </label>

                      <select
                        value={data.gst_registered}
                        onChange={(e) => {
                          const value = e.target.value;
                          setData('gst_registered', value);

                          if (value === 'no') {
                            Inertia.visit(route('gst-details'));
                          }
                        }}
                        className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>


                    </div>

                    {/* GSTIN field only if registered */}
                    {data.gst_registered === 'yes' && (
                      <div className="flex items-center">
                        <label className="w-32 font-bold text-gray-700 shrink-0">
                          GSTIN:
                        </label>

                        <input
                          ref={gstinRef}
                          type="text"
                          value={data.gstin}
                          onChange={e => setData('gstin', e.target.value.toUpperCase())}
                          className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none"
                        />
                      </div>
                    )}

                    <div className="flex items-center">
                      <label className="w-32 font-bold text-gray-700 shrink-0">PAN No.:</label>
                      <input ref={panRef} type="text" value={data.pan} onChange={e => setData('pan', e.target.value.toUpperCase())} onKeyDown={(e) => handleKeyDown(e, fyRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none" />
                    </div>
                    <div className="flex items-center">
                      <label className="w-32 font-bold text-gray-700 shrink-0">
                        Currency:
                      </label>

                      <select
                        value={data.currency}
                        onChange={e => setData('currency', e.target.value)}
                        className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none"
                      >
                        <option value="INR">INR - Indian Rupee</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                      </select>
                    </div>


                  </div>
                </div>

                <div>
                  <h3 className="font-bold border-b border-blue-300 text-blue-900 pb-0.5 mb-2 uppercase">Financial Year</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label className="w-32 font-bold text-gray-700 leading-tight shrink-0">FY Beginning:</label>
                      <input ref={fyRef} type="date" value={data.financial_year_from} onChange={e => setData('financial_year_from', e.target.value)} onKeyDown={(e) => handleKeyDown(e, booksRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none uppercase" />
                    </div>
                    <div className="flex items-center">
                      <label className="w-32 font-bold text-gray-700 leading-tight shrink-0">Books Beginning:</label>
                      <input ref={booksRef} type="date" value={data.books_beginning_from} onChange={e => setData('books_beginning_from', e.target.value)} onKeyDown={(e) => handleKeyDown(e, submitRef)} className="flex-1 border border-gray-400 px-1 py-0.5 focus:bg-[#fff9c4] outline-none uppercase" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CommonFormModal>
        </div>
      </div>
    </AppLayout>
  );
}