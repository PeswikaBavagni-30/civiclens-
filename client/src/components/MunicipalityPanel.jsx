export default function MunicipalityPanel() {
  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto mb-8">
      <h2 className="text-xl font-bold mb-4 text-center">
        Municipality Emergency Contacts
      </h2>

      <ul className="space-y-3 text-sm">
        <li>
          🚧 <b>Road Department:</b> 1800-234-567
        </li>
        <li>
          🗑️ <b>Garbage & Sanitation:</b> 1800-345-678
        </li>
        <li>
          🚰 <b>Water Supply:</b> 1800-456-789
        </li>
        <li>
          💡 <b>Electricity:</b> 1800-567-890
        </li>
        <li>
          🏛️ <b>Municipal Office:</b> 040-1234-5678
        </li>
      </ul>

      <p className="text-xs text-gray-500 mt-4 text-center">
        *Displayed for quick administrative action
      </p>
    </div>
  );
}
