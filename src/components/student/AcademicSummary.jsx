export default function AcademicSummary({ academicInfo }) {
  if (!academicInfo) return null;

  const Item = ({ label, value }) => (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-bold text-blue-800">
        Academic Information
      </h2>

      <Item
        label="Highest Qualification"
        value={academicInfo.highestQualification}
      />

      {academicInfo.tenth?.board && (
        <>
          <h3 className="font-semibold text-gray-700">10th Standard</h3>
          <Item label="Board" value={academicInfo.tenth.board} />
          <Item label="Marks" value={academicInfo.tenth.marks} />
          <Item label="Passout Year" value={academicInfo.tenth.passoutYear} />
        </>
      )}

      {academicInfo.twelfth?.board && (
        <>
          <h3 className="font-semibold text-gray-700">12th Standard</h3>
          <Item label="Board" value={academicInfo.twelfth.board} />
          <Item label="Marks" value={academicInfo.twelfth.marks} />
          <Item label="Passout Year" value={academicInfo.twelfth.passoutYear} />
        </>
      )}

      {academicInfo.degree?.course && (
        <>
          <h3 className="font-semibold text-gray-700">Degree</h3>
          <Item label="Course" value={academicInfo.degree.course} />
          <Item label="University" value={academicInfo.degree.university} />
          <Item label="Passout Year" value={academicInfo.degree.passoutYear} />
        </>
      )}

      {academicInfo.pg?.course && (
        <>
          <h3 className="font-semibold text-gray-700">Post Graduation</h3>
          <Item label="Course" value={academicInfo.pg.course} />
          <Item label="University" value={academicInfo.pg.university} />
          <Item label="Passout Year" value={academicInfo.pg.passoutYear} />
        </>
      )}
    </div>
  );
}
