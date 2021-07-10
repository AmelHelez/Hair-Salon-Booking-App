using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class UpdatedSalonTreatmentsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SalonTreatment_Salons_SalonId",
                table: "SalonTreatment");

            migrationBuilder.DropForeignKey(
                name: "FK_SalonTreatment_Treatments_TreatmentId",
                table: "SalonTreatment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SalonTreatment",
                table: "SalonTreatment");

            migrationBuilder.RenameTable(
                name: "SalonTreatment",
                newName: "SalonTreatments");

            migrationBuilder.RenameIndex(
                name: "IX_SalonTreatment_TreatmentId",
                table: "SalonTreatments",
                newName: "IX_SalonTreatments_TreatmentId");

            migrationBuilder.RenameIndex(
                name: "IX_SalonTreatment_SalonId",
                table: "SalonTreatments",
                newName: "IX_SalonTreatments_SalonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SalonTreatments",
                table: "SalonTreatments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SalonTreatments_Salons_SalonId",
                table: "SalonTreatments",
                column: "SalonId",
                principalTable: "Salons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SalonTreatments_Treatments_TreatmentId",
                table: "SalonTreatments",
                column: "TreatmentId",
                principalTable: "Treatments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SalonTreatments_Salons_SalonId",
                table: "SalonTreatments");

            migrationBuilder.DropForeignKey(
                name: "FK_SalonTreatments_Treatments_TreatmentId",
                table: "SalonTreatments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SalonTreatments",
                table: "SalonTreatments");

            migrationBuilder.RenameTable(
                name: "SalonTreatments",
                newName: "SalonTreatment");

            migrationBuilder.RenameIndex(
                name: "IX_SalonTreatments_TreatmentId",
                table: "SalonTreatment",
                newName: "IX_SalonTreatment_TreatmentId");

            migrationBuilder.RenameIndex(
                name: "IX_SalonTreatments_SalonId",
                table: "SalonTreatment",
                newName: "IX_SalonTreatment_SalonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SalonTreatment",
                table: "SalonTreatment",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SalonTreatment_Salons_SalonId",
                table: "SalonTreatment",
                column: "SalonId",
                principalTable: "Salons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SalonTreatment_Treatments_TreatmentId",
                table: "SalonTreatment",
                column: "TreatmentId",
                principalTable: "Treatments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
