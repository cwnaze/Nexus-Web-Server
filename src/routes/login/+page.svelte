<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<form method='POST' action='?/login' class='text-yellow-200 flex flex-col justify-center items-center h-screen text-2xl'>
    <div class='flex flex-col gap-6 w-128'>
        <div>
            <a href='/' class='underline hover:text-yellow-100'>&larr; Back</a>
        </div>
        <div class='flex flex-col'>
            <label for='email'>Email</label>
            <input id='email' placeholder='jdoe@example.com' name='email' type='text' value={form?.email ?? ''} class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'>
            {#if form?.email_missing}<p class='text-error'>Email is required</p>{/if}
        </div>
        <div class='flex flex-col'>
            <label for='password'>Password</label>
            <input id='password' placeholder='Password' name='password' type='password' class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'>
            {#if form?.password_missing}<p class='text-error'>Password is required</p>{/if}
            {#if form?.invalid_login}<p class='text-error'>Email or password is incorrect</p>{/if}
        </div>
        <button class='bg-yellow-200 text-blue-100 font-bold mx-auto p-3 px-16 rounded-lg border-4 border-yellow-200 mt-6 hover:bg-blue-200 hover:text-yellow-200 hover:border-yellow-200'>Login</button>
    </div>
</form>