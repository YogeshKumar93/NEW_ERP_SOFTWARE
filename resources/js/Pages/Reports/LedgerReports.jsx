import AppLayout from "@/Layouts/AppLayout";

export default function LedgerReports({ ledgers }) {

    return (
        <AppLayout title="Ledger Reports">

            <div className="p-4">

                <h2 className="text-lg font-bold mb-4">
                    List of Ledgers
                </h2>

                <table className="w-full border">

                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Ledger Name</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {ledgers.map((l) => (

                            <tr key={l.id}>

                                <td className="border p-2">
                                    {l.name}
                                </td>

                                <td className="border p-2">

                                    <a
                                      href={`/ledger-reports/${l.id}`}
                                      className="bg-blue-500 text-white px-2 py-1"
                                    >
                                        View
                                    </a>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </AppLayout>
    );
}
