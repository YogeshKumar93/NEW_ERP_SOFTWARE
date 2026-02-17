import CommonFormModal from '@/Components/Common/CommonFormModal';
import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';


const GSTDetailsForm = () => {

  const { gstDetail } = usePage().props;


  const [formData, setFormData] = useState({
    registrationStatus: gstDetail?.registration_status ?? 'Active',
    state: gstDetail?.state ?? '',
    registrationType: gstDetail?.registration_type ?? 'Regular',
    assesseeOtherTerritory: gstDetail?.assessee_other_territory ?? 'No',
    gstin: gstDetail?.gstin ?? '',
    periodicity: gstDetail?.periodicity ?? 'Monthly',
    eWayBillApplicable: gstDetail?.eway_bill_applicable ? 'Yes' : 'No',
    applicableFrom: gstDetail?.eway_applicable_from ?? '',
    applicableIntrastate: 'Yes',
    eInvoicingApplicable: gstDetail?.einvoicing_applicable ? 'Yes' : 'No'
});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();
alert("Form Submit Triggered");
    router.post(route('gst.details.store'), formData);
};


    // Tally look classes
    const rowClass = "flex justify-between items-center h-6";
    const labelClass = "text-[12px] text-[#263238]";
    const inputClass = "bg-transparent border-none font-bold text-[#01579b] focus:bg-[#fff9c4] outline-none px-1 text-[12px] w-40 text-right";
    const selectClass = "bg-transparent border-none font-bold text-[#01579b] focus:bg-[#fff9c4] outline-none px-1 text-[12px] cursor-pointer appearance-none text-right";

    return (
      <AppLayout>
        <CommonFormModal 
            isOpen={true} 
            title="GST Details" 
               onCancel={() => window.history.back()} 
            onSubmit={handleSubmit}
            width="w-[800px]" 
        >
            <div className="grid grid-cols-2 gap-x-12 p-2">
                
                {/* Left Column */}
                <div className="space-y-1">
                    <div className={rowClass}>
                        <span className={labelClass}>Registration status</span>
                        <span className="font-bold text-[12px] text-[#01579b]">: {formData.registrationStatus}</span>
                    </div>

                    <div className="border-b border-gray-400 mt-2 mb-1 uppercase text-[11px] font-bold italic text-gray-600">
                        GST Registration Details
                    </div>

                    <div className={rowClass}>
                        <label className={labelClass}>State</label>
                        <div className="flex items-center">
                            <span className="text-[12px] mr-2">:</span>
                            <input name="state" value={formData.state} onChange={handleChange} className={inputClass} />
                        </div>
                    </div>

                    <div className={rowClass}>
                        <label className={labelClass}>Registration type</label>
                        <div className="flex items-center">
                            <span className="text-[12px] mr-2">:</span>
                            <select name="registrationType" value={formData.registrationType} onChange={handleChange} className={selectClass}>
                                <option value="Regular">Regular</option>
                                <option value="Composition">Composition</option>
                            </select>
                        </div>
                    </div>

                    <div className={rowClass}>
                        <label className={labelClass}>Assessee of Other Territory</label>
                        <div className="flex items-center">
                            <span className="text-[12px] mr-2">:</span>
                            <select name="assesseeOtherTerritory" value={formData.assesseeOtherTerritory} onChange={handleChange} className={selectClass}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                    </div>

                    <div className={rowClass}>
                        <label className={labelClass}>GSTIN/UIN</label>
                        <div className="flex items-center">
                            <span className="text-[12px] mr-2">:</span>
                            <input name="gstin" value={formData.gstin} onChange={handleChange} className={`${inputClass} border-b border-dotted border-gray-400`} placeholder="Enter GSTIN" />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-1">
                    <div className="border-b border-gray-400 mt-7 mb-1 uppercase text-[11px] font-bold italic text-gray-600">
                        e-Way Bill Details
                    </div>

                    <div className={rowClass}>
                        <label className={labelClass}>e-Way Bill applicable</label>
                        <div className="flex items-center">
                            <span className="text-[12px] mr-2">:</span>
                            <select name="eWayBillApplicable" value={formData.eWayBillApplicable} onChange={handleChange} className={selectClass}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>

                    <div className={rowClass}>
                        <label className={labelClass}>Applicable from</label>
                        <div className="flex items-center">
                            <span className="text-[12px] mr-2">:</span>
                            <input name="applicableFrom" value={formData.applicableFrom} onChange={handleChange} className={inputClass} />
                        </div>
                    </div>

                    <div className="border-b border-gray-400 mt-4 mb-1 uppercase text-[11px] font-bold italic text-gray-600">
                        e-Invoice Details
                    </div>

                    <div className={rowClass}>
                        <label className={labelClass}>e-Invoicing applicable</label>
                        <div className="flex items-center">
                            <span className="text-[12px] mr-2">:</span>
                            <select name="eInvoicingApplicable" value={formData.eInvoicingApplicable} onChange={handleChange} className={selectClass}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-2 border-t border-gray-300 flex justify-between font-bold text-[11px]">
                <span>Create another GST Registration for the Company</span>
                <span>: No</span>
            </div>
        </CommonFormModal>
        </AppLayout>
    );
};

export default GSTDetailsForm;