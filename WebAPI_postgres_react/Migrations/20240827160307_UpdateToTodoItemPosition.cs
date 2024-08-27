using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI_postgres_react.Migrations
{
    /// <inheritdoc />
    public partial class UpdateToTodoItemPosition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Position",
                table: "TodoItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Position",
                table: "TodoItems");
        }
    }
}
