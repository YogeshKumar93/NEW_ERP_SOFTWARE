import AppLayout from "@/Layouts/AppLayout";

export default function LedgerReportView({ ledger, transactions }) {

    return (
        <AppLayout title="Ledger Statement">

            <div className="p-4">

                <h2 className="text-lg font-bold mb-3">
                    Ledger : {ledger.name}
                </h2>

                <table className="w-full border">

                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Particular</th>
                            <th className="border p-2">Debit</th>
                            <th className="border p-2">Credit</th>
                        </tr>
                    </thead>

                    <tbody>

                        {transactions.map((t,i)=>(

                            <tr key={i}>

                                <td className="border p-2">{t.date}</td>

                                <td className="border p-2">{t.particular}</td>

                                <td className="border p-2 text-right">
                                    {t.debit}
                                </td>

                                <td className="border p-2 text-right">
                                    {t.credit}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </AppLayout>
    );
}