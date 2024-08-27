using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_postgres_react.Data;
using WebAPI_postgres_react.Models;

namespace WebAPI_postgres_react.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class TodoItemController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TodoItemController(ApplicationDbContext context)
    {
        _context = context;
    }
    
    // GET: api/TodoItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {
        return await _context.TodoItems.OrderBy(todoitem => todoitem.Position).ToListAsync();
    }
    
    
    // GET: api/TodoItems/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);
        
        if (todoItem == null)
            return NotFound();
        
        return todoItem;
    }
    
    // POST: api/TodoItems
    [HttpPost]
    public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
    {
        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
    }
    
    // PUT: api/TodoItems/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
    {
        if (id != todoItem.Id)
            return BadRequest();
        
        _context.Entry(todoItem).State = EntityState.Modified;
        
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TodoItemExists(id))
                return NotFound();
            else
                throw;
        }
        
        return NoContent();
    }
    
    // DELETE: api/TodoItems/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem == null)
            return NotFound();
        
        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }

    // PUT: api/TodoItems/updatePositions
    [HttpPut("updatePositions")]
    public async Task<IActionResult> UpdatePositions([FromBody] List<TodoItemPosition> positions)
    {
        foreach (var position in positions)
        {
            var todoItem = await _context.TodoItems.FindAsync(position.Id);
            if (todoItem != null)
            {
                todoItem.Position = position.Position;
            }
        }
        await _context.SaveChangesAsync();
        return Ok();
    }

    private bool TodoItemExists(long id)
    {
        return _context.TodoItems.Any(e => e.Id == id);
    }
}

public class TodoItemPosition
{
    public long Id { get; set; }
    public int Position { get; set; }
}
