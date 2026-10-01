/* =========================================
   DATA SISWA
========================================= */

let daftarSiswa =
    JSON.parse(
        localStorage.getItem("daftarSiswa")
    ) || [];



/* =========================================
   TANGGAL SEKARANG
========================================= */

function tampilkanTanggal() {

    const tanggal =
        new Date();

    const pilihan = {

        weekday: "long",

        year: "numeric",

        month: "long",

        day: "numeric"

    };

    document.getElementById(
        "tanggalSekarang"
    ).textContent =
        tanggal.toLocaleDateString(
            "id-ID",
            pilihan
        );
}



/* =========================================
   SIMPAN DATA
========================================= */

function simpanData() {

    localStorage.setItem(
        "daftarSiswa",
        JSON.stringify(daftarSiswa)
    );

}



/* =========================================
   FORM BIODATA
========================================= */

document
    .getElementById("siswaForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const absen =
                document.getElementById(
                    "absen"
                ).value.trim();


            const nama =
                document.getElementById(
                    "nama"
                ).value.trim();


            const nis =
                document.getElementById(
                    "nis"
                ).value.trim();


            const jenisKelamin =
                document.getElementById(
                    "jenisKelamin"
                ).value;


            const tempatLahir =
                document.getElementById(
                    "tempatLahir"
                ).value.trim();


            const tanggalLahir =
                document.getElementById(
                    "tanggalLahir"
                ).value;


            const alamat =
                document.getElementById(
                    "alamat"
                ).value.trim();


            const nomorHP =
                document.getElementById(
                    "nomorHP"
                ).value.trim();


            const hobi =
                document.getElementById(
                    "hobi"
                ).value.trim();


            const citaCita =
                document.getElementById(
                    "citaCita"
                ).value.trim();



            /* CEK NOMOR ABSEN */

            const nomorSudahAda =
                daftarSiswa.some(
                    function(siswa) {

                        return (
                            siswa.absen ==
                            absen
                        );

                    }
                );


            if (nomorSudahAda) {

                alert(
                    "❌ Nomor absen tersebut sudah digunakan!"
                );

                return;

            }



            /* DATA SISWA */

            const siswa = {

                absen: absen,

                nama: nama,

                nis: nis,

                jenisKelamin:
                    jenisKelamin,

                tempatLahir:
                    tempatLahir,

                tanggalLahir:
                    tanggalLahir,

                alamat: alamat,

                nomorHP: nomorHP,

                hobi: hobi,

                citaCita: citaCita,

                kehadiran:
                    "Belum Absen"

            };



            daftarSiswa.push(
                siswa
            );


            simpanData();


            tampilkanSiswa();

            tampilkanAbsensi();

            hitungStatistik();

            updateHeroTotal();



            document
                .getElementById(
                    "siswaForm"
                )
                .reset();



            alert(
                "✅ Biodata " +
                nama +
                " berhasil ditambahkan!"
            );



            document
                .getElementById(
                    "absensi"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );



/* =========================================
   TAMPILKAN DATA SISWA
========================================= */

function tampilkanSiswa() {

    const tabel =
        document.getElementById(
            "tabelSiswa"
        );


    tabel.innerHTML = "";



    daftarSiswa.forEach(
        function(siswa, index) {


            let statusClass =
                "";


            if (
                siswa.kehadiran ===
                "Hadir"
            ) {

                statusClass =
                    "status hadir";

            }

            else if (
                siswa.kehadiran ===
                "Izin"
            ) {

                statusClass =
                    "status izin";

            }

            else if (
                siswa.kehadiran ===
                "Sakit"
            ) {

                statusClass =
                    "status sakit";

            }

            else if (
                siswa.kehadiran ===
                "Alpa"
            ) {

                statusClass =
                    "status alpa";

            }

            else {

                statusClass =
                    "status belum";

            }



            const tanggalLahir =
                siswa.tanggalLahir
                    ?
                    formatTanggal(
                        siswa.tanggalLahir
                    )
                    :
                    "-";



            tabel.innerHTML += `

                <tr>

                    <td>
                        ${siswa.absen}
                    </td>

                    <td>
                        <strong>
                            ${siswa.nama}
                        </strong>
                    </td>

                    <td>
                        ${siswa.nis}
                    </td>

                    <td>
                        ${siswa.jenisKelamin}
                    </td>

                    <td>
                        ${siswa.tempatLahir},
                        ${tanggalLahir}
                    </td>

                    <td>
                        ${siswa.alamat}
                    </td>

                    <td>
                        ${siswa.nomorHP || "-"}
                    </td>

                    <td>
                        ${siswa.hobi || "-"}
                    </td>

                    <td>
                        ${siswa.citaCita || "-"}
                    </td>

                    <td>

                        <span class="${statusClass}">
                            ${siswa.kehadiran}
                        </span>

                    </td>

                    <td>

                        <button
                            class="delete-btn"
                            onclick="hapusSiswa(${index})"
                        >
                            🗑 Hapus
                        </button>

                    </td>

                </tr>

            `;

        }
    );

}



/* =========================================
   TAMPILKAN ABSENSI
========================================= */

function tampilkanAbsensi() {

    const container =
        document.getElementById(
            "daftarAbsen"
        );


    container.innerHTML = "";



    if (
        daftarSiswa.length === 0
    ) {

        container.innerHTML = `

            <div class="attendance-card">

                <h3>
                    Belum ada siswa
                </h3>

                <p>
                    Silakan tambahkan biodata siswa terlebih dahulu.
                </p>

            </div>

        `;

        return;

    }



    daftarSiswa.forEach(
        function(siswa, index) {


            let statusClass =
                "belum";


            if (
                siswa.kehadiran ===
                "Hadir"
            ) {

                statusClass =
                    "hadir";

            }

            else if (
                siswa.kehadiran ===
                "Izin"
            ) {

                statusClass =
                    "izin";

            }

            else if (
                siswa.kehadiran ===
                "Sakit"
            ) {

                statusClass =
                    "sakit";

            }

            else if (
                siswa.kehadiran ===
                "Alpa"
            ) {

                statusClass =
                    "alpa";

            }



            container.innerHTML += `

                <div class="attendance-card">

                    <h3>
                        ${siswa.absen}.
                        ${siswa.nama}
                    </h3>

                    <p>
                        NIS:
                        ${siswa.nis}
                    </p>


                    <span class="status ${statusClass}">
                        ${siswa.kehadiran}
                    </span>


                    <div class="attendance-buttons">

                        <button
                            onclick="ubahStatus(${index}, 'Hadir')"
                        >
                            ✅ Hadir
                        </button>


                        <button
                            onclick="ubahStatus(${index}, 'Izin')"
                        >
                            🟡 Izin
                        </button>


                        <button
                            onclick="ubahStatus(${index}, 'Sakit')"
                        >
                            🔵 Sakit
                        </button>


                        <button
                            onclick="ubahStatus(${index}, 'Alpa')"
                        >
                            ❌ Alpa
                        </button>


                        <button
                            class="delete-btn"
                            onclick="hapusSiswa(${index})"
                        >
                            🗑 Hapus
                        </button>

                    </div>

                </div>

            `;

        }
    );

}



/* =========================================
   UBAH STATUS ABSENSI
========================================= */

function ubahStatus(
    index,
    status
) {

    daftarSiswa[index].kehadiran =
        status;


    simpanData();


    tampilkanSiswa();

    tampilkanAbsensi();

    hitungStatistik();

}



/* =========================================
   HAPUS SISWA
========================================= */

function hapusSiswa(index) {

    const nama =
        daftarSiswa[index].nama;


    const yakin =
        confirm(
            "Apakah kamu yakin ingin menghapus data " +
            nama +
            "?"
        );


    if (!yakin) {

        return;

    }


    daftarSiswa.splice(
        index,
        1
    );


    simpanData();


    tampilkanSiswa();

    tampilkanAbsensi();

    hitungStatistik();

    updateHeroTotal();


    alert(
        "🗑 Data " +
        nama +
        " berhasil dihapus."
    );

}



/* =========================================
   STATISTIK
========================================= */

function hitungStatistik() {

    let hadir = 0;

    let izin = 0;

    let sakit = 0;

    let alpa = 0;



    daftarSiswa.forEach(
        function(siswa) {

            if (
                siswa.kehadiran ===
                "Hadir"
            ) {

                hadir++;

            }

            else if (
                siswa.kehadiran ===
                "Izin"
            ) {

                izin++;

            }

            else if (
                siswa.kehadiran ===
                "Sakit"
            ) {

                sakit++;

            }

            else if (
                siswa.kehadiran ===
                "Alpa"
            ) {

                alpa++;

            }

        }
    );



    document.getElementById(
        "totalSiswa"
    ).textContent =
        daftarSiswa.length;


    document.getElementById(
        "totalHadir"
    ).textContent =
        hadir;


    document.getElementById(
        "totalIzin"
    ).textContent =
        izin;


    document.getElementById(
        "totalSakit"
    ).textContent =
        sakit;


    document.getElementById(
        "totalAlpa"
    ).textContent =
        alpa;

}



/* =========================================
   TOTAL SISWA DI HERO
========================================= */

function updateHeroTotal() {

    const element =
        document.getElementById(
            "heroTotal"
        );


    if (element) {

        element.textContent =
            daftarSiswa.length;

    }

}



/* =========================================
   PENCARIAN SISWA
========================================= */

function cariSiswa() {

    const input =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase();


    const baris =
        document
            .getElementById(
                "tabelSiswa"
            )
            .getElementsByTagName(
                "tr"
            );


    for (
        let i = 0;
        i < baris.length;
        i++
    ) {

        const teks =
            baris[i]
                .textContent
                .toLowerCase();


        if (
            teks.includes(input)
        ) {

            baris[i].style.display =
                "";

        }

        else {

            baris[i].style.display =
                "none";

        }

    }

}



/* =========================================
   FORMAT TANGGAL
========================================= */

function formatTanggal(
    tanggal
) {

    if (!tanggal) {

        return "-";

    }


    const date =
        new Date(
            tanggal +
            "T00:00:00"
        );


    return date.toLocaleDateString(
        "id-ID",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}



/* =========================================
   BUKA FORM
========================================= */

function bukaForm() {

    document
        .getElementById(
            "biodata"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =========================================
   RESET FORM
========================================= */

function resetForm() {

    document
        .getElementById(
            "siswaForm"
        )
        .reset();

}



/* =========================================
   EXPORT KE MICROSOFT EXCEL
========================================= */

function exportExcel() {


    /* CEK DATA */

    if (
        daftarSiswa.length === 0
    ) {

        alert(
            "❌ Belum ada data siswa yang bisa diekspor!"
        );

        return;

    }



    /* BUAT DATA UNTUK EXCEL */

    const dataExcel =
        daftarSiswa.map(
            function(siswa) {

                return {

                    "No. Absen":
                        siswa.absen,

                    "Nama Lengkap":
                        siswa.nama,

                    "NIS":
                        siswa.nis,

                    "Jenis Kelamin":
                        siswa.jenisKelamin,

                    "Tempat Lahir":
                        siswa.tempatLahir,

                    "Tanggal Lahir":
                        siswa.tanggalLahir
                            ?
                            formatTanggal(
                                siswa.tanggalLahir
                            )
                            :
                            "",

                    "Alamat":
                        siswa.alamat,

                    "No. HP":
                        siswa.nomorHP || "",

                    "Hobi":
                        siswa.hobi || "",

                    "Cita-cita":
                        siswa.citaCita || "",

                    "Kehadiran":
                        siswa.kehadiran

                };

            }
        );



    /* BUAT WORKSHEET */

    const worksheet =
        XLSX.utils.json_to_sheet(
            dataExcel
        );



    /* ATUR LEBAR KOLOM */

    worksheet["!cols"] = [

        { wch: 10 },

        { wch: 25 },

        { wch: 15 },

        { wch: 18 },

        { wch: 20 },

        { wch: 18 },

        { wch: 35 },

        { wch: 18 },

        { wch: 20 },

        { wch: 20 },

        { wch: 18 }

    ];



    /* BUAT WORKBOOK */

    const workbook =
        XLSX.utils.book_new();



    /* MASUKKAN SHEET */

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Data Absensi"
    );



    /* NAMA FILE */

    const tanggal =
        new Date();


    const tahun =
        tanggal.getFullYear();


    const bulan =
        String(
            tanggal.getMonth() + 1
        ).padStart(2, "0");


    const hari =
        String(
            tanggal.getDate()
        ).padStart(2, "0");



    const namaFile =
        "Data_Absensi_XI_RPL_3_" +
        tahun +
        "-" +
        bulan +
        "-" +
        hari +
        ".xlsx";



    /* DOWNLOAD EXCEL */

    XLSX.writeFile(
        workbook,
        namaFile
    );



    alert(
        "✅ Data berhasil diekspor ke Microsoft Excel!"
    );

}



/* =========================================
   JALANKAN SAAT WEBSITE DIBUKA
========================================= */

tampilkanTanggal();

tampilkanSiswa();

tampilkanAbsensi();

hitungStatistik();

updateHeroTotal();